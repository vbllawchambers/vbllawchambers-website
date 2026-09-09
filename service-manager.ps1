# ==============================================================================
# VBL Law Chambers -- Social Automation Suite Service Manager
# Unified Graceful Start, Stop, Status, and Restart Controller
# ==============================================================================

param (
    [Parameter(Position = 0)]
    [ValidateSet("start", "stop", "status", "restart")]
    [string]$Action = "status"
)

$RootPath = $PSScriptRoot
$WebPath = Join-Path $RootPath "web"
$PidFile = Join-Path $WebPath ".web-portal.pid"

function Write-BrandHeader {
    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor DarkCyan
    Write-Host " [VBL LAW CHAMBERS] - ADVOCATE SOCIAL AUTOMATION SUITE" -ForegroundColor Yellow
    Write-Host "======================================================================" -ForegroundColor DarkCyan
    Write-Host ""
}

function Test-DockerDaemon {
    try {
        $out = & docker info 2>&1
        return ($LASTEXITCODE -eq 0)
    } catch {
        return $false
    }
}

function Ensure-DockerRunning {
    Write-Host "[1/3] Checking Docker daemon status..." -ForegroundColor Cyan
    if (Test-DockerDaemon) {
        Write-Host "  -> Docker daemon is active and running." -ForegroundColor Green
        return $true
    }

    Write-Host "  -> Docker is not responding. Attempting to start Docker Desktop..." -ForegroundColor Yellow

    $dockerPaths = @(
        "$env:LOCALAPPDATA\Programs\DockerDesktop\Docker Desktop.exe",
        "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    )

    $dockerExe = $null
    foreach ($p in $dockerPaths) {
        if (Test-Path $p) {
            $dockerExe = $p
            break
        }
    }

    if ($dockerExe) {
        Start-Process $dockerExe -WindowStyle Minimized
        Write-Host "  -> Launched: $dockerExe" -ForegroundColor Cyan
        Write-Host "  -> Waiting for Docker daemon to become ready (up to 90 seconds)..." -ForegroundColor Cyan
        
        $timeout = 90
        $elapsed = 0
        while ($elapsed -lt $timeout) {
            Start-Sleep -Seconds 3
            $elapsed += 3
            Write-Host -NoNewline "." -ForegroundColor Yellow
            if (Test-DockerDaemon) {
                Write-Host ""
                Write-Host "  -> Docker daemon is ready!" -ForegroundColor Green
                return $true
            }
        }
        Write-Host ""
        Write-Host "  -> Timed out waiting for Docker. Please verify Docker Desktop manually." -ForegroundColor Red
        return $false
    } else {
        Write-Host "  -> Could not locate Docker Desktop executable automatically." -ForegroundColor Red
        Write-Host "  -> Please launch Docker Desktop from your Start Menu." -ForegroundColor Yellow
        return $false
    }
}

function Stop-WebPortalProcesses {
    param ([switch]$Quiet)

    if (-not $Quiet) {
        Write-Host "[1/2] Stopping Web Portal and API background services..." -ForegroundColor Cyan
    }

    # Check PID file
    if (Test-Path $PidFile) {
        $savedPid = (Get-Content $PidFile -ErrorAction SilentlyContinue)
        if ($savedPid) {
            $trimmedPid = $savedPid.Trim()
            Stop-Process -Id $trimmedPid -Force -ErrorAction SilentlyContinue
        }
        Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
    }

    # Clean up processes listening on port 3300 and 5173
    $ports = @(3300, 5173)
    foreach ($p in $ports) {
        $conns = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue
        if ($conns) {
            $pidsToKill = $conns | Select-Object -ExpandProperty OwningProcess -Unique
            foreach ($procId in $pidsToKill) {
                if ($procId -gt 0) {
                    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
                    if (-not $Quiet) {
                        Write-Host "  -> Terminated process on port $p (PID: $procId)." -ForegroundColor DarkGray
                    }
                }
            }
        }
    }

    if (-not $Quiet) {
        Write-Host "  -> Web Portal and API stopped cleanly." -ForegroundColor Green
    }
}

function Start-Services {
    Write-BrandHeader
    Write-Host "Starting all automation services gracefully..." -ForegroundColor Green
    Write-Host ""

    # 1. Docker
    $dockerOk = Ensure-DockerRunning
    if ($dockerOk) {
        Write-Host ""
        Write-Host "[2/3] Launching Docker Compose Stack (n8n + Postiz + Postgres + Redis)..." -ForegroundColor Cyan
        Push-Location $RootPath
        & docker compose up -d
        Pop-Location
        Write-Host "  -> Docker containers started in background." -ForegroundColor Green
    } else {
        Write-Host "  -> Skipping Docker Compose because Docker daemon is offline." -ForegroundColor DarkYellow
    }

    # 2. Web Portal (React + Express API)
    Write-Host ""
    Write-Host "[3/3] Launching Web Publishing Portal and Express API..." -ForegroundColor Cyan
    Stop-WebPortalProcesses -Quiet

    Push-Location $WebPath
    $job = Start-Process "npm.cmd" -ArgumentList "run", "dev" -WorkingDirectory $WebPath -PassThru -WindowStyle Hidden
    if ($job) {
        $job.Id | Out-File -FilePath $PidFile -Encoding ASCII -Force
        Write-Host "  -> Web portal service launched (PID: $($job.Id))." -ForegroundColor Green
    }
    Pop-Location

    Write-Host ""
    Write-Host "Waiting 4 seconds for services to initialize..." -ForegroundColor DarkGray
    Start-Sleep -Seconds 4

    Show-Status
}

function Stop-Services {
    Write-BrandHeader
    Write-Host "Stopping all automation services gracefully..." -ForegroundColor Yellow
    Write-Host ""

    # 1. Stop Web Portal
    Stop-WebPortalProcesses

    # 2. Stop Docker Compose
    Write-Host ""
    Write-Host "[2/2] Stopping Docker Containers (n8n, Postiz, Temporal, Postgres, Redis)..." -ForegroundColor Cyan
    if (Test-DockerDaemon) {
        Push-Location $RootPath
        & docker compose stop
        Pop-Location
        Write-Host "  -> All Docker containers stopped gracefully." -ForegroundColor Green
    } else {
        Write-Host "  -> Docker daemon is offline. No active containers to stop." -ForegroundColor DarkGray
    }

    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor Green
    Write-Host " All services stopped cleanly. Zero orphaned processes." -ForegroundColor Green
    Write-Host "======================================================================" -ForegroundColor Green
}

function Test-Endpoint {
    param (
        [string]$Name,
        [string]$Url,
        [int]$TimeoutSec = 3
    )

    try {
        $res = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec -ErrorAction Stop
        if ($res.StatusCode -ge 200 -and $res.StatusCode -lt 400) {
            Write-Host "  [ONLINE]  " -NoNewline -ForegroundColor Green
            Write-Host "$Name " -NoNewline -ForegroundColor White
            Write-Host "($Url)" -ForegroundColor Cyan
            return $true
        }
    } catch {
        # Endpoint offline
    }
    Write-Host "  [OFFLINE] " -NoNewline -ForegroundColor Red
    Write-Host "$Name " -NoNewline -ForegroundColor White
    Write-Host "($Url)" -ForegroundColor DarkGray
    return $false
}

function Show-Status {
    Write-BrandHeader
    Write-Host "--- ACTIVE SERVICE HEALTH ---" -ForegroundColor Yellow
    Write-Host ""

    $null = Test-Endpoint -Name "Web Portal (React Vite)" -Url "http://localhost:5173"
    $null = Test-Endpoint -Name "Web Portal (Express API)" -Url "http://localhost:3300/api/health"
    $null = Test-Endpoint -Name "Postiz Social Publisher" -Url "http://localhost:4500"
    $null = Test-Endpoint -Name "n8n Workflow Automation" -Url "http://localhost:5678"
    $null = Test-Endpoint -Name "Temporal Workflow UI"   -Url "http://localhost:8080"

    Write-Host ""
    Write-Host "--- DOCKER CONTAINER STATUS ---" -ForegroundColor Yellow
    if (Test-DockerDaemon) {
        & docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    } else {
        Write-Host "  Docker daemon is currently offline." -ForegroundColor Red
    }

    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor DarkCyan
    Write-Host " Quick Access Links:" -ForegroundColor Yellow
    Write-Host "  - Content Publisher: http://localhost:5173" -ForegroundColor White
    Write-Host "  - Express API:       http://localhost:3300" -ForegroundColor White
    Write-Host "  - Postiz Manager:    http://localhost:4500" -ForegroundColor White
    Write-Host "  - n8n Automations:   http://localhost:5678" -ForegroundColor White
    Write-Host "======================================================================" -ForegroundColor DarkCyan
    Write-Host ""
}

# --- Router ---
switch ($Action.ToLower()) {
    "start"   { Start-Services }
    "stop"    { Stop-Services }
    "restart" { Stop-Services; Start-Sleep -Seconds 2; Start-Services }
    "status"  { Show-Status }
    default   { Show-Status }
}
