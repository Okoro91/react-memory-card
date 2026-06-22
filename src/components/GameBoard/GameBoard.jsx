import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { motion } from "framer-motion";

const GameBoard = ({ cards, onCardClick, gameOver }) => {
  const [flippedCards, setFlippedCards] = useState(new Set());

  useEffect(() => {
    setFlippedCards(new Set());
  }, [cards]);

  const handleCardClick = (cardId) => {
    if (!gameOver && !flippedCards.has(cardId)) {
      setFlippedCards((prev) => new Set([...prev, cardId]));
      onCardClick(cardId);
    }
  };

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
            onClick={handleCardClick}
            isDisabled={gameOver || flippedCards.has(card.id)}
            isFlipped={flippedCards.has(card.id)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GameBoard;
