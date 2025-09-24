import React from 'react';
import { PlayerCard, EmptyPlayerSlot } from './player-card';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface FootballFieldProps {
  players: Player[];
  onSlotClick: () => void;
}

export function FootballField({ players, onSlotClick }: FootballFieldProps) {
  // Positions for 5v5 formation (1-2-2 each side)
  const teamAPositions = [
    { id: 'teamA-gk', position: 'Gardien', x: '5%', y: '50%' },
    { id: 'teamA-def1', position: 'Défenseur', x: '20%', y: '30%' },
    { id: 'teamA-def2', position: 'Défenseur', x: '20%', y: '70%' },
    { id: 'teamA-att1', position: 'Attaquant', x: '35%', y: '35%' },
    { id: 'teamA-att2', position: 'Attaquant', x: '35%', y: '65%' },
  ];

  const teamBPositions = [
    { id: 'teamB-gk', position: 'Gardien', x: '95%', y: '50%' },
    { id: 'teamB-def1', position: 'Défenseur', x: '80%', y: '30%' },
    { id: 'teamB-def2', position: 'Défenseur', x: '80%', y: '70%' },
    { id: 'teamB-att1', position: 'Attaquant', x: '65%', y: '35%' },
    { id: 'teamB-att2', position: 'Attaquant', x: '65%', y: '65%' },
  ];

  const getPlayerForPosition = (index: number) => {
    return players[index] || null;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Field Container */}
      <div className="relative bg-green-800/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-2xl">
        {/* Field Background */}
        <div className="relative w-full h-[400px] bg-gradient-to-b from-green-500/20 to-green-600/20 rounded-lg border-2 border-white/30 overflow-hidden">
          
          {/* Field Lines */}
          <div className="absolute inset-0">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/50" />
            
            {/* Center Circle */}
            <div className="absolute left-1/2 top-1/2 w-20 h-20 border border-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            
            {/* Goal Areas */}
            <div className="absolute left-0 top-1/2 w-16 h-24 border border-white/50 transform -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 w-16 h-24 border border-white/50 transform -translate-y-1/2" />
            
            {/* Goals */}
            <div className="absolute left-0 top-1/2 w-4 h-16 bg-white/20 transform -translate-y-1/2 -translate-x-full border border-white/50" />
            <div className="absolute right-0 top-1/2 w-4 h-16 bg-white/20 transform -translate-y-1/2 translate-x-full border border-white/50" />
          </div>

          {/* Team A Players (Left Side) */}
          {teamAPositions.map((pos, index) => (
            <div
              key={pos.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.x, top: pos.y }}
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
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.x, top: pos.y }}
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

        {/* Team Labels */}
        <div className="flex justify-between mt-4">
          <div className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-300/30">
            <h3 className="text-white font-medium">Équipe A</h3>
            <p className="text-white/70 text-sm">{players.filter((_, i) => i < 5).length}/5 joueurs</p>
          </div>
          <div className="bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-red-300/30">
            <h3 className="text-white font-medium">Équipe B</h3>
            <p className="text-white/70 text-sm">{players.filter((_, i) => i >= 5).length}/5 joueurs</p>
          </div>
        </div>
      </div>
    </div>
  );
}