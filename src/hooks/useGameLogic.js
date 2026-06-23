import { useState, useEffect, useCallback, useRef } from "react";
import { shuffleArray } from "../utils/shuffleArray";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

export const useGameLogic = (initialCards, playSound, onGameComplete) => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() =>
    getFromLocalStorage("bestScore", 0),
  );
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isInitialized = useRef(false);
  const prevInitialCardsLength = useRef(0);
  const isUpdatingWin = useRef(false);
  const timerRef = useRef(null);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    if (initialCards.length > 0 && !isInitialized.current) {
      const shuffledCards = shuffleArray(initialCards);
      setCards(shuffledCards);
      setClickedCards(new Set());
      setScore(0);
      setGameOver(false);
      setWinMessage("");
      setIsWin(false);
      setCombo(0);
      setMaxCombo(0);
      setTimeLeft(totalTime);
      setIsTimerActive(true);
      setIsPaused(false);
      isInitialized.current = true;
    }

    if (
      prevInitialCardsLength.current !== initialCards.length &&
      initialCards.length > 0
    ) {
      prevInitialCardsLength.current = initialCards.length;
      const shuffledCards = shuffleArray(initialCards);
      setCards(shuffledCards);
      setClickedCards(new Set());
      setScore(0);
      setGameOver(false);
      setWinMessage("");
      setIsWin(false);
      setCombo(0);
      setMaxCombo(0);
      setTimeLeft(totalTime);
      setIsTimerActive(true);
      setIsPaused(false);
      playSound?.("shuffle");
    }
  }, [initialCards, totalTime, playSound]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isTimerActive && !isPaused && !gameOver && timeLeftRef.current > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setGameOver(true);
            setWinMessage("⏰ Time's Up! Better luck next time!");
            setIsTimerActive(false);
            playSound?.("gameOver");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive, isPaused, gameOver, playSound]);

  const pauseTimer = useCallback(() => {
    if (isTimerActive && !gameOver && timeLeft > 0) {
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      playSound?.("click");
    }
  }, [isTimerActive, gameOver, timeLeft, playSound]);

  const resumeTimer = useCallback(() => {
    if (isTimerActive && !gameOver && timeLeft > 0 && isPaused) {
      setIsPaused(false);
      playSound?.("click");
    }
  }, [isTimerActive, gameOver, timeLeft, isPaused, playSound]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  }, [isPaused, pauseTimer, resumeTimer]);

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
      setGameOver(true);
      setIsTimerActive(false);
      setIsPaused(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const timeBonus = Math.floor(timeLeft / 5) * 2;
      const comboBonus = maxCombo * 3;
      const finalScore = score + timeBonus + comboBonus;

      setScore(finalScore);

      if (finalScore > bestScore) {
        setBestScore(finalScore);
        setWinMessage(`Amazing! You caught all Pokémon! 
          Time Bonus: +${timeBonus} | Combo Bonus: +${comboBonus}`);
      } else {
        setWinMessage(`You caught all Pokémon! 
          Time Bonus: +${timeBonus} | Combo Bonus: +${comboBonus}`);
      }

      playSound?.("win");

      if (onGameComplete) {
        onGameComplete({ finalScore, timeBonus, comboBonus, maxCombo });
      }

      setTimeout(() => {
        isUpdatingWin.current = false;
      }, 100);
    }
  }, [
    clickedCards.size,
    cards.length,
    gameOver,
    isWin,
    timeLeft,
    score,
    bestScore,
    maxCombo,
    playSound,
    onGameComplete,
  ]);

  const resetGame = useCallback(() => {
    if (initialCards.length > 0) {
      // Clear any existing timer
      // if (timerRef.current) {
      //   clearInterval(timerRef.current);
      //   timerRef.current = null;
      // }

      const shuffledCards = shuffleArray(initialCards);
      setCards(shuffledCards);
      setScore(0);
      setClickedCards(new Set());
      setGameOver(false);
      setWinMessage("");
      setIsWin(false);
      setCombo(0);
      setMaxCombo(0);
      setTimeLeft(totalTime);
      setIsTimerActive(true);
      setIsPaused(false);
      playSound?.("shuffle");
    }
  }, [initialCards, totalTime, playSound]);

  const handleCardClick = useCallback(
    (cardId) => {
      if (gameOver || isPaused || !isTimerActive || timeLeft <= 0) return;

      if (clickedCards.has(cardId)) {
        setGameOver(true);
        setIsTimerActive(false);
        setIsPaused(false);
        setWinMessage("😢 Game Over! You clicked a Pokémon twice! 😢");
        setCombo(0);
        playSound?.("gameOver");

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      const newClickedCards = new Set(clickedCards);
      newClickedCards.add(cardId);
      const newCombo = combo + 1;
      let newScore = score + 1;

      if (newCombo > 0) {
        const comboBonus = Math.floor(newCombo / 3);
        newScore += comboBonus;
      }

      setClickedCards(newClickedCards);
      setScore(newScore);
      setCombo(newCombo);

      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }

      playSound?.("catch");

      if (newScore > bestScore) {
        setBestScore(newScore);
        playSound?.("win");
      }

      setCards((currentCards) => shuffleArray(currentCards));
      playSound?.("click");
    },
    [
      clickedCards,
      score,
      bestScore,
      gameOver,
      combo,
      maxCombo,
      isTimerActive,
      isPaused,
      timeLeft,
      playSound,
    ],
  );

  const playAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    cards,
    score,
    bestScore,
    gameOver,
    winMessage,
    isWin,
    combo,
    maxCombo,
    timeLeft,
    totalTime,
    isTimerActive,
    isPaused,
    formatTime,
    handleCardClick,
    playAgain,
    loading: initialCards.length === 0,
    resetGame,
    togglePause,
    pauseTimer,
    resumeTimer,
  };
};
