import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { motion } from "framer-motion";

const GameBoard = ({ cards, onCardClick, gameOver, isPaused }) => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const isDisabled = gameOver || isPaused;

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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
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
            isDisabled={isDisabled || flippedCards.has(card.id)}
            isFlipped={flippedCards.has(card.id)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GameBoard;
