export default function FloatingButtons() {
  return (
    <>
      <style>{`
        @keyframes pulse-green {
          0%, 100% { background-color: #16a34a; box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          50% { background-color: #15803d; box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
        }
        @keyframes pulse-blue {
          0%, 100% { background-color: #2563eb; box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
          50% { background-color: #1d4ed8; box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
        }
        @keyframes pulse-orange {
          0%, 100% { background-color: #f97316; box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          50% { background-color: #ea580c; box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
        }
        .btn-green { animation: pulse-green 2s infinite; }
        .btn-blue { animation: pulse-blue 2s infinite; animation-delay: 0.4s; }
        .btn-orange { animation: pulse-orange 2s infinite; animation-delay: 0.8s; }
      `}</style>

      {/* bottom-28 leaves room for the Tidio chat bubble below the stack */}
      <div className="fixed bottom-28 right-6 z-50 flex flex-col gap-4">

        {/* Call */}
        <a
          href="tel:+18657227114"
          className="btn-green text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006.3 6.3l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/></svg> Call Now
        </a>

        {/* Email */}
        <a
          href="mailto:leo@usstrucking.org"
          className="btn-blue text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg> Email
        </a>

        {/* Quote */}
        <a
          href="/#quote-form"
          className="btn-orange text-white rounded-full shadow-2xl px-6 py-4 font-bold flex items-center justify-center gap-3 transition duration-300 hover:scale-105 whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M5 16V9l2-4h10l2 4v7"/><path d="M3 16h18"/><circle cx="7.5" cy="16" r="0.5" fill="currentColor"/><circle cx="16.5" cy="16" r="0.5" fill="currentColor"/></svg> Get Quote
        </a>

      </div>
    </>
  );
}