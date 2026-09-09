import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, X } from 'lucide-react';

export default function FloatingActions({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  // Pre-filled WhatsApp link
  const whatsappUrl = "https://api.whatsapp.com/send?phone=919876543210&text=Hello%20VBL%20Law%20Chambers,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl p-4 border border-amber-500/30 flex flex-col gap-3 min-w-[240px] animate-in fade-in zoom-in-95">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold border-b border-slate-800 pb-2 flex justify-between items-center">
            <span>Quick Consultation</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
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
            className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-all text-sm font-medium"
          >
            <div className="bg-emerald-500 text-white p-1.5 rounded-full">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <span>WhatsApp Consultation</span>
          </a>

          {/* Schedule Form */}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              if (onNavigate) onNavigate('/contact');
            }}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white transition-all text-sm font-medium"
          >
            <div className="bg-amber-600 text-white p-1.5 rounded-full">
              <Calendar className="w-4 h-4" />
            </div>
            <span>Book Chamber Appointment</span>
          </a>
        </div>
      )}

      {/* Primary Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border-2 border-white/20"
          title="Chat directly on WhatsApp"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 font-semibold text-sm border-2 border-amber-400/30 cursor-pointer"
          aria-label="Quick legal consultation options"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Consult Chambers</span>
        </button>
      </div>
    </div>
  );
}
