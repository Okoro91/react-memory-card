// components/GameBoard/GameBoard.jsx
import React from "react";
import Card from "../Card/Card";
import { motion } from "framer-motion";

const GameBoard = ({ cards, onCardClick, gameOver }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            id={card.id}
            name={card.name}
            image={card.image}
            onClick={onCardClick}
            isDisabled={gameOver}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GameBoard;
