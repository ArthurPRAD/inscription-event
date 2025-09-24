import React, { useState, useEffect } from 'react';
import { PlayerCard, EmptyPlayerSlot } from './player-card';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface FootballField3DProps {
  players: Player[];
  onSlotClick: () => void;
}

export function FootballField3D({ players, onSlotClick }: FootballField3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        const x = (e.clientX / window.innerWidth - 0.5) * 10; // Limite le mouvement à ±5 degrés
        const y = (e.clientY / window.innerHeight - 0.5) * 5; // Limite le mouvement à ±2.5 degrés
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  // Positions for 5v5 formation in landscape orientation
  const teamAPositions = [
    { id: 'teamA-gk', position: 'Gardien', x: '8%', y: '50%' },
    { id: 'teamA-def1', position: 'Défenseur', x: '25%', y: '25%' },
    { id: 'teamA-def2', position: 'Défenseur', x: '25%', y: '75%' },
    { id: 'teamA-att1', position: 'Attaquant', x: '40%', y: '35%' },
    { id: 'teamA-att2', position: 'Attaquant', x: '40%', y: '65%' },
  ];

  const teamBPositions = [
    { id: 'teamB-gk', position: 'Gardien', x: '92%', y: '50%' },
    { id: 'teamB-def1', position: 'Défenseur', x: '75%', y: '25%' },
    { id: 'teamB-def2', position: 'Défenseur', x: '75%', y: '75%' },
    { id: 'teamB-att1', position: 'Attaquant', x: '60%', y: '35%' },
    { id: 'teamB-att2', position: 'Attaquant', x: '60%', y: '65%' },
  ];

  const getPlayerForPosition = (index: number) => {
    return players[index] || null;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto perspective-1000">
      {/* 3D Field Container */}
      <div 
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${45 + mousePosition.y}deg) rotateY(${mousePosition.x}deg) rotateZ(0deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Field Shadow */}
        <div className="absolute inset-0 bg-black/40 blur-xl transform translate-y-8 translate-z-[-50px]" />
        
        {/* Main Field */}
        <div className="relative bg-gradient-to-b from-green-800/40 to-green-900/40 backdrop-blur-md border border-cyan-400/30 shadow-2xl transform-gpu">
          {/* Field Background with perspective */}
          <div className="relative w-full h-[300px] bg-gradient-to-b from-green-600/30 to-green-700/30 border-2 border-cyan-400/20 overflow-hidden">
            
            {/* Field Pattern */}
            <div className="absolute inset-0 opacity-40">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 19px,
                      rgba(0, 255, 255, 0.1) 20px
                    )
                  `
                }}
              />
            </div>

            {/* Field Lines */}
            <div className="absolute inset-0">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400/60 shadow-glow" />
              
              {/* Center Circle */}
              <div className="absolute left-1/2 top-1/2 w-20 h-20 border border-cyan-400/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-glow" />
              
              {/* Goal Areas */}
              <div className="absolute left-0 top-1/2 w-16 h-24 border border-cyan-400/60 transform -translate-y-1/2 shadow-glow" />
              <div className="absolute right-0 top-1/2 w-16 h-24 border border-cyan-400/60 transform -translate-y-1/2 shadow-glow" />
              
              {/* Goals with neon effect */}
              <div className="absolute left-0 top-1/2 w-3 h-16 bg-cyan-400/30 transform -translate-y-1/2 -translate-x-full border border-cyan-400/60 shadow-glow animate-pulse" />
              <div className="absolute right-0 top-1/2 w-3 h-16 bg-cyan-400/30 transform -translate-y-1/2 translate-x-full border border-cyan-400/60 shadow-glow animate-pulse" />
              
              {/* Corner arcs */}
              <div className="absolute top-0 left-0 w-8 h-8 border-b border-r border-cyan-400/40 rounded-br-full" />
              <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-cyan-400/40 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-t border-r border-cyan-400/40 rounded-tr-full" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l border-cyan-400/40 rounded-tl-full" />
            </div>

            {/* Team A Players (Left Side) */}
            {teamAPositions.map((pos, index) => (
              <div
                key={pos.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110"
                style={{ 
                  left: pos.x, 
                  top: pos.y,
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))'
                }}
              >
                {getPlayerForPosition(index) ? (
                  <PlayerCard
                    firstName={getPlayerForPosition(index)!.firstName}
                    lastName={getPlayerForPosition(index)!.lastName}
                    position={pos.position}
                  />
                ) : (
                  <EmptyPlayerSlot onClick={onSlotClick} />
                )}
              </div>
            ))}

            {/* Team B Players (Right Side) */}
            {teamBPositions.map((pos, index) => (
              <div
                key={pos.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110"
                style={{ 
                  left: pos.x, 
                  top: pos.y,
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))'
                }}
              >
                {getPlayerForPosition(index + 5) ? (
                  <PlayerCard
                    firstName={getPlayerForPosition(index + 5)!.firstName}
                    lastName={getPlayerForPosition(index + 5)!.lastName}
                    position={pos.position}
                  />
                ) : (
                  <EmptyPlayerSlot onClick={onSlotClick} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team Labels with futuristic style */}
        <div className="flex justify-between mt-6 px-4">
          <div className="bg-cyan-500/20 backdrop-blur-sm px-6 py-3 border border-cyan-400/40 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-cyan-300 font-medium relative z-10">Équipe A</h3>
            <p className="text-cyan-400/80 text-sm relative z-10">{players.filter((_, i) => i < 5).length}/5 joueurs</p>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm px-6 py-3 border border-green-400/40 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-green-300 font-medium relative z-10">Équipe B</h3>
            <p className="text-green-400/80 text-sm relative z-10">{players.filter((_, i) => i >= 5).length}/5 joueurs</p>
          </div>
        </div>
      </div>

      {/* Interaction hint */}
      <div className="text-center mt-4 text-cyan-400/60 text-sm">
        <p>Bougez votre souris pour explorer le terrain en 3D</p>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .shadow-glow {
          box-shadow: 0 0 10px currentColor;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}