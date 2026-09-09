import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, X, Shield, ArrowRight } from 'lucide-react';

export default function FloatingActions({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  // Pre-filled WhatsApp link
  const whatsappUrl = "https://api.whatsapp.com/send?phone=919876543210&text=Hello%20VBL%20Law%20Chambers,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation%20with%20Advocate%20V.%20Bhagya%20Lakshmi.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-5 border border-amber-500/40 flex flex-col gap-3.5 min-w-[260px] animate-in fade-in zoom-in-95">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold border-b border-slate-800 pb-2.5 flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Chambers Inquiries</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* WhatsApp Direct Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-all text-sm font-medium border border-emerald-500/30 group"
          >
            <div className="bg-emerald-500 text-white p-2 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white leading-tight">WhatsApp Chat</span>
              <span className="text-xs text-emerald-300/80 group-hover:text-white">Direct advocate line</span>
            </div>
          </a>

          {/* Schedule Form */}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              if (onNavigate) onNavigate('/contact');
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white transition-all text-sm font-medium border border-amber-500/30 group"
          >
            <div className="bg-amber-600 text-white p-2 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white leading-tight">Book Chamber Visit</span>
              <span className="text-xs text-amber-300/80 group-hover:text-white">Kavali office appointment</span>
            </div>
          </a>
        </div>
      )}

      {/* Unified Luxury Floating Capsule Dock */}
      <div className="flex items-center bg-slate-950/95 backdrop-blur-md p-1.5 rounded-full border border-amber-500/50 shadow-2xl ring-1 ring-amber-400/20">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 sm:p-3 rounded-full transition-transform hover:scale-105 flex items-center justify-center pulse-whatsapp shadow-md"
          title="Chat directly on WhatsApp with VBL Law Chambers"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 pl-2.5 pr-4 py-2 bg-transparent border-0 text-white hover:text-amber-300 transition-colors cursor-pointer text-xs sm:text-sm font-semibold"
          aria-label="Quick legal consultation options"
        >
          <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="uppercase tracking-wider font-bold text-xs sm:inline">Consult Chambers</span>
        </button>
      </div>
    </div>
  );
}
