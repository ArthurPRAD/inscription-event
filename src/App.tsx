import React, { useState } from 'react';
import { AnimatedBackground } from './components/animated-background';
import { RegistrationForm } from './components/registration-form';
import { FootballField3D } from './components/football-field-3d';
import kernLogo from 'figma:asset/60cbc685aa7d9766a4299cdc55d1e7eeab56156a.png';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleRegistration = (firstName: string, lastName: string) => {
    if (players.length < 10) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        firstName,
        lastName,
      };
      setPlayers(prev => [...prev, newPlayer]);
      setShowForm(false);
    }
  };

  const handleSlotClick = () => {
    if (players.length < 10) {
      setShowForm(true);
    }
  };

  const isFieldFull = players.length >= 10;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        
        {/* Header with Logo */}
        <div className="text-center space-y-6">
          {/* Logo KERN */}
          <div className="flex justify-center mb-4">
            <img 
              src={kernLogo} 
              alt="KERN Consulting" 
              className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
          <h1 className="text-cyan-100 text-4xl md:text-6xl font-bold tracking-tight">
            Five Créteil
          </h1>
          <p className="text-cyan-300/80 text-lg md:text-xl max-w-2xl mx-auto">
            Inscrivez-vous pour une partie de futsal en temps réel
          </p>
          <div className="flex items-center justify-center space-x-4 text-cyan-400/80">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-glow" />
              <span className="text-sm font-medium">{10 - players.length} places restantes</span>
            </div>
            <div className="w-px h-4 bg-cyan-400/30" />
            <div className="flex items-center space-x-2">
              <span className="text-sm">👥 {players.length}/10 inscrits</span>
            </div>
          </div>
        </div>

        {/* Football Field 3D */}
        <FootballField3D 
          players={players} 
          onSlotClick={handleSlotClick}
        />

        {/* Registration Form or Button */}
        <div className="flex flex-col items-center space-y-4">
          {showForm ? (
            <div className="space-y-4">
              <RegistrationForm 
                onSubmit={handleRegistration}
                isFieldFull={isFieldFull}
              />
              <button
                onClick={() => setShowForm(false)}
                className="text-cyan-400/70 hover:text-cyan-300 text-sm underline transition-colors"
              >
                Annuler
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              {!isFieldFull && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Nouvelle Inscription
                </button>
              )}
              
              {players.length > 0 && (
                <div className="bg-gray-900/60 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 max-w-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-green-400/5" />
                  <h3 className="text-cyan-200 font-medium mb-3 relative z-10">Joueurs inscrits :</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm relative z-10">
                    {players.map((player, index) => (
                      <div key={player.id} className="text-cyan-300/80">
                        {index + 1}. {player.firstName} {player.lastName}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-cyan-400/60 text-sm space-y-1">
          <p>🏟️ Futsal Five - Créteil</p>
          <p>Formation automatique en 5v5</p>
          <div className="flex items-center justify-center space-x-2 pt-2">
            <span className="text-xs">Powered by</span>
            <img 
              src={kernLogo} 
              alt="KERN Consulting" 
              className="h-4 w-auto opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}