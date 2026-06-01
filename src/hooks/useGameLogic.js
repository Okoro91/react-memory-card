import { useState, useEffect, useCallback, useRef } from "react";
import { shuffleArray } from "../utils/shuffleArray";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

export const useGameLogic = (initialCards, playSound) => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() =>
    getFromLocalStorage("bestScore", 0),
  );
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [combo, setCombo] = useState(0); // For combo feature later

  const isInitialized = useRef(false);
  const prevInitialCardsLength = useRef(0);
  const isUpdatingWin = useRef(false);

  useEffect(() => {
    if (initialCards.length > 0 && !isInitialized.current) {
      const shuffledCards = shuffleArray(initialCards);
      setCards(shuffledCards);
      setClickedCards(new Set());
      setScore(0);
      setGameOver(false);
      setWinMessage("");
      setIsWin(false);
      isInitialized.current = true;
    }

    if (prevInitialCardsLength.current !== initialCards.length) {
      prevInitialCardsLength.current = initialCards.length;
      if (initialCards.length > 0) {
        const shuffledCards = shuffleArray(initialCards);
        setCards(shuffledCards);
        setClickedCards(new Set());
        setScore(0);
        setGameOver(false);
        setWinMessage("");
        setIsWin(false);
        setCombo(0);
        playSound?.("shuffle");
      }
    }
  }, [initialCards]);

  useEffect(() => {
    if (bestScore > 0) {
      saveToLocalStorage("bestScore", bestScore);
    }
  }, [bestScore]);

  useEffect(() => {
    if (
      !isUpdatingWin.current &&
      !gameOver &&
      !isWin &&
      cards.length > 0 &&
      clickedCards.size === cards.length
    ) {
      isUpdatingWin.current = true;
      setIsWin(true);
      setWinMessage(" Amazing! You caught all Pokémon! ");
      setGameOver(true);
      playSound?.("win");
      setTimeout(() => {
        isUpdatingWin.current = false;
      }, 100);
    }
  }, [clickedCards.size, cards.length, gameOver, isWin]);

  const resetGame = useCallback(() => {
    if (initialCards.length > 0) {
      const shuffledCards = shuffleArray(initialCards);
      setCards(shuffledCards);
      setScore(0);
      setClickedCards(new Set());
      setGameOver(false);
      setWinMessage("");
      setIsWin(false);
      setCombo(0);
      playSound?.("shuffle");
    }
  }, [initialCards]);

  const handleCardClick = useCallback(
    (cardId) => {
      if (gameOver) {
        return;
      }

      if (clickedCards.has(cardId)) {
        setGameOver(true);
        setWinMessage(" Game Over! You clicked a Pokémon twice! ");
        setCombo(0);
        playSound?.("gameOver");
        return;
      }

      const newClickedCards = new Set(clickedCards);
      newClickedCards.add(cardId);
      const newScore = score + 1;
      const newCombo = combo + 1;

      setClickedCards(newClickedCards);
      setScore(newScore);
      setCombo(newCombo);
      playSound?.("catch");

      if (newScore > bestScore) {
        setBestScore(newScore);
        playSound?.("win");
      }

      setCards((currentCards) => shuffleArray(currentCards));
      playSound?.("click");
    },
    [clickedCards, score, bestScore, gameOver, combo, playSound],
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
    combo,
    handleCardClick,
    playAgain,
    loading: initialCards.length === 0,
  };
};
