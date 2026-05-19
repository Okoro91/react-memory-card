// components/Header/Header.jsx
import React from "react";
import { Gamepad2, Trophy, Target } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Gamepad2 className="w-10 h-10 md:w-12 md:h-12 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Pokémon Memory Card Game
          </h1>
        </div>
        <p className="text-lg md:text-xl text-blue-100 flex items-center justify-center gap-2">
          <Target className="w-5 h-5" />
          Click each Pokémon only once! Can you catch them all?
        </p>
        <div className="mt-3 text-sm text-blue-200 flex items-center justify-center gap-2">
          <Trophy className="w-4 h-4" />
          Test your memory - Don't click the same card twice!
        </div>
      </div>
    </header>
  );
};

export default Header;
