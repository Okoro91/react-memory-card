import { useState, useEffect, useCallback } from "react";
import { shuffleArray } from "../utils/shuffleArray";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

export const useGameLogic = (initialCards) => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() =>
    getFromLocalStorage("bestScore", 0),
  );
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (initialCards.length > 0) {
      const shuffledCards = shuffleArray(initialCards);
      setCards(shuffledCards);
    }
  }, [initialCards]);

  useEffect(() => {
    if (bestScore > 0) {
      saveToLocalStorage("bestScore", bestScore);
    }
  }, [bestScore]);

  useEffect(() => {
    if (clickedCards.size === cards.length && cards.length > 0) {
      setIsWin(true);
      setWinMessage("🎉 Amazing! You caught all Pokémon! 🎉");
      setGameOver(true);
    }
  }, [clickedCards.size, cards.length]);

  const resetGame = useCallback(() => {
    const shuffledCards = shuffleArray(initialCards);
    setCards(shuffledCards);
    setScore(0);
    setClickedCards(new Set());
    setGameOver(false);
    setWinMessage("");
    setIsWin(false);
  }, [initialCards]);

  const handleCardClick = useCallback(
    (cardId) => {
      if (gameOver) {
        return;
      }

      if (clickedCards.has(cardId)) {
        setGameOver(true);
        setWinMessage(" Game Over! You clicked a Pokémon twice! ");
        return;
      }

      const newClickedCards = new Set(clickedCards);
      newClickedCards.add(cardId);
      const newScore = score + 1;

      setClickedCards(newClickedCards);
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      setCards((currentCards) => shuffleArray(currentCards));
    },
    [clickedCards, score, bestScore, gameOver],
  );

  const playAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return {
    cards,
    score,
    bestScore,
    gameOver,
    winMessage,
    isWin,
    handleCardClick,
    playAgain,
    loading: initialCards.length === 0,
  };
};
