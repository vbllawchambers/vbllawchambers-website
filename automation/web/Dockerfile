# =============================================================================
# VBL Law Chambers — Advocate Content Portal
# Multi-stage build: Vite builds the React bundle, Express serves it + the API
# on a single port (3300). No Vite dev server runs in production.
# =============================================================================

# --- Stage 1: build the React frontend -------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies (including devDependencies — Vite is needed to build)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# --- Stage 2: production runtime -------------------------------------------
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# Only production dependencies land in the final image
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Application server plus the compiled frontend from stage 1
COPY server.js ./
COPY --from=builder /app/dist ./dist

# Run as the built-in unprivileged node user
USER node

EXPOSE 3300

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const p=process.env.PORT||process.env.WEB_PORT||3300;fetch('http://127.0.0.1:'+p+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# --max-old-space-size caps V8's heap below the 512MB container limit. Node
# otherwise sizes the old space from the HOST's memory rather than the cgroup,
# grows past the limit and gets OOM-killed instead of collecting garbage.
CMD ["node", "--max-old-space-size=400", "server.js"]
