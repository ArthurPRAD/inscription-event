import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface RegistrationFormProps {
  onSubmit: (firstName: string, lastName: string) => void;
  isFieldFull: boolean;
}

export function RegistrationForm({ onSubmit, isFieldFull }: RegistrationFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim() && !isFieldFull) {
      onSubmit(firstName.trim(), lastName.trim());
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <Card className="bg-gray-900/80 backdrop-blur-md border border-cyan-400/40 shadow-2xl p-6 w-full max-w-md relative overflow-hidden">
      {/* Futuristic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-green-400/5 opacity-50" />
      
      <div className="space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-cyan-100">Inscription Five</h2>
          <p className="text-cyan-300/80 text-sm">Créteil - Futsal</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-glow" />
            <span className="text-cyan-400/80 text-xs font-medium">Places disponibles</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-cyan-200">
              Prénom
            </Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Votre prénom"
              className="bg-gray-800/50 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-400/50 focus:bg-gray-700/50 focus:border-cyan-300/50 transition-all"
              required
              disabled={isFieldFull}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-cyan-200">
              Nom
            </Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Votre nom"
              className="bg-gray-800/50 border-cyan-400/30 text-cyan-100 placeholder:text-cyan-400/50 focus:bg-gray-700/50 focus:border-cyan-300/50 transition-all"
              required
              disabled={isFieldFull}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900 border-0 shadow-lg hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-300 font-medium"
            disabled={isFieldFull || !firstName.trim() || !lastName.trim()}
          >
            {isFieldFull ? 'Terrain Complet' : "S'inscrire"}
          </Button>
        </form>

        {isFieldFull && (
          <div className="text-center p-3 bg-orange-500/20 border border-orange-400/40 rounded-lg relative">
            <div className="absolute inset-0 bg-orange-400/5 animate-pulse" />
            <p className="text-orange-200 text-sm relative z-10">
              Le terrain est complet (10/10 joueurs)
            </p>
          </div>
        )}

        {/* Info */}
        <div className="text-center text-cyan-400/70 text-xs space-y-1">
          <p>⚽ Formation : 5 vs 5</p>
          <p>🏟️ Terrain : Futsal Créteil</p>
          <p>⏰ Inscription en temps réel</p>
        </div>
      </div>
    </Card>
  );
}