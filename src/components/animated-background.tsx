import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dark Futuristic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-grid-pattern"
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>
      
      {/* Futuristic Animated Elements */}
      <div className="absolute inset-0">
        {/* Neon Rings */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-cyan-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-2/3 right-1/4 w-32 h-32 border border-green-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Moving Light Beams */}
        <div 
          className="absolute w-96 h-2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rotate-45 animate-pulse"
          style={{ 
            top: '20%', 
            left: '-10%',
            animationDuration: '3s'
          }}
        />
        <div 
          className="absolute w-80 h-1 bg-gradient-to-r from-transparent via-green-400/15 to-transparent -rotate-45 animate-pulse"
          style={{ 
            bottom: '30%', 
            right: '-10%',
            animationDuration: '4s',
            animationDelay: '1.5s'
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-green-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Digital Noise Effect */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(0, 255, 0, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(0, 100, 255, 0.06) 0%, transparent 50%)
              `,
              animation: 'digital-noise 8s ease-in-out infinite alternate'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes digital-noise {
          0% { opacity: 0.05; }
          50% { opacity: 0.1; }
          100% { opacity: 0.03; }
        }
      `}</style>
    </div>
  );
}