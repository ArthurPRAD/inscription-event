import React from 'react';

interface PlayerCardProps {
  firstName: string;
  lastName: string;
  position?: string;
}

export function PlayerCard({ firstName, lastName, position }: PlayerCardProps) {
  return (
    <div className="group relative">
      <div className="bg-gray-900/80 backdrop-blur-md border border-cyan-400/40 rounded-lg p-3 shadow-xl hover:bg-gray-800/80 hover:border-cyan-300/60 transition-all duration-300 min-w-[120px] relative overflow-hidden">
        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-green-500 rounded-full flex items-center justify-center mb-2 shadow-lg border border-cyan-300/50">
            <span className="text-gray-900 text-sm font-medium">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </span>
          </div>
          <div className="text-cyan-100">
            <p className="text-sm font-medium leading-tight">{firstName}</p>
            <p className="text-sm font-medium leading-tight">{lastName}</p>
          </div>
          {position && (
            <span className="text-xs text-cyan-400/80 mt-1 font-medium">{position}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function EmptyPlayerSlot({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="bg-gray-900/40 backdrop-blur-sm border-2 border-dashed border-cyan-400/30 rounded-lg p-3 shadow-lg hover:bg-gray-800/60 hover:border-cyan-300/50 transition-all duration-300 cursor-pointer min-w-[120px] group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Pulse effect on hover */}
      <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
      
      <div className="flex flex-col items-center text-center h-[72px] justify-center relative z-10">
        <div className="w-8 h-8 border-2 border-dashed border-cyan-400/50 rounded-full flex items-center justify-center mb-2 group-hover:border-cyan-300/70 group-hover:shadow-glow transition-all">
          <span className="text-cyan-400/60 text-lg group-hover:text-cyan-300/80 transition-colors">+</span>
        </div>
        <p className="text-cyan-400/60 text-xs group-hover:text-cyan-300/80 transition-colors font-medium">Ajouter</p>
      </div>
    </div>
  );
}