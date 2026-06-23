import React, { useState, useEffect, useMemo } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Play,
  AlertCircle,
  Loader2,
  Crown,
  Heart,
  XCircle,
  Zap,
  Dice5,
} from "lucide-react";
import Header from "./components/Header/Header";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import GameBoard from "./components/GameBoard/GameBoard";
import SoundToggle from "./components/SoundToggle/SoundToggle";
import NewCardsButton from "./components/CardDeck/NewCardsButton";
import TimerControls from "./components/TimerControls/TimerControls";
import { useApiFetch } from "./hooks/useApiFetch";
import { useGameLogic } from "./hooks/useGameLogic";
import { useSound } from "./hooks/useSound";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import "./index.css";

function App() {
  const { cards: fetchedCards, loading, error, refreshCards } = useApiFetch();
  const { playSound, toggleMute, isMuted } = useSound();
  const [difficulty, setDifficulty] = useState(() =>
    getFromLocalStorage("difficulty", "medium"),
  );
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [gameStats, setGameStats] = useState(null);

  const getCardsByDifficulty = (allCards, diff) => {
    if (!allCards.length) return [];
    const difficultySettings = {
      easy: 6,
      medium: 12,
      hard: 16,
    };
    const count = difficultySettings[diff];
    return allCards.slice(0, count);
  };

  const currentCards = getCardsByDifficulty(fetchedCards, difficulty);

  const handleGameComplete = (stats) => {
    setGameStats(stats);
  };

  const {
    cards,
    score,
    bestScore,
    gameOver,
    winMessage,
    isWin,
    combo,
    maxCombo,
    timeLeft,
    formatTime,
    isTimerActive,
    isPaused,
    handleCardClick,
    playAgain,
    loading: gameLoading,
    resetGame,
    togglePause,
  } = useGameLogic(currentCards, playSound, handleGameComplete);

  useEffect(() => {
    saveToLocalStorage("difficulty", difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (gameOver) {
      setShowGameOverModal(true);
      // const timer = setTimeout(() => {
      //   setShowGameOverModal(false);
      // }, 5000);
      // return () => clearTimeout(timer);
    }
  }, [gameOver]);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const handlePlayAgain = () => {
    setShowGameOverModal(false);
    playAgain();
  };

  const handleRefreshCards = () => {
    setShowGameOverModal(false);
    refreshCards();
    resetGame();
  };

  if (loading || gameLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <Loader2 className="w-24 h-24 text-purple-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <p className="mt-6 text-xl text-gray-700 font-semibold">
              Loading Pokémon...
            </p>
            <p className="text-gray-500 mt-2">Getting your cards ready!</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-lg text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h2 className="text-2xl font-bold mb-2">
              Oops! Something went wrong
            </h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-50 to-pink-100 custom-scrollbar">
      {isWin && <Confetti recycle={false} numberOfPieces={500} gravity={0.2} />}

      <Header />
      <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />

      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex flex-wrap items-center md:justify-between gap-2 justify-center mb-6">
          <div className="flex gap-2 bg-white rounded-lg shadow-md p-2">
            {[
              {
                level: "easy",
                icon: <Heart className="w-4 h-4 text-green-500" />,
                label: "Easy",
              },
              {
                level: "medium",
                icon: <Zap className="w-4 h-4 text-yellow-500" />,
                label: "Medium",
              },
              {
                level: "hard",
                icon: <Crown className="w-4 h-4 text-red-500" />,
                label: "Hard",
              },
            ].map(({ level, icon, label }) => (
              <button
                key={level}
                onClick={() => handleDifficultyChange(level)}
                className={`
                  px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-sm
                  ${
                    difficulty === level
                      ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TimerControls
              isPaused={isPaused}
              togglePause={togglePause}
              isTimerActive={isTimerActive}
              gameOver={gameOver}
              timeLeft={timeLeft}
              formatTime={formatTime}
              isLoading={loading || gameLoading}
            />

            <NewCardsButton
              onRefresh={handleRefreshCards}
              isLoading={loading || gameLoading}
              disabled={gameOver && !isWin}
            />
          </div>
        </div>

        <Scoreboard
          currentScore={score}
          bestScore={bestScore}
          totalCards={currentCards.length}
          combo={combo}
          maxCombo={maxCombo}
          timeLeft={timeLeft}
          formatTime={formatTime}
          isTimerActive={isTimerActive}
          isPaused={isPaused}
          gameOver={gameOver}
        />

        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          gameOver={gameOver}
          isPaused={isPaused}
        />

        <AnimatePresence>
          {showGameOverModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
              onClick={handlePlayAgain}
            >
              <motion.div
                initial={{ scale: 0.8, y: -100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 100 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center mb-4">
                  {isWin ? (
                    <Crown className="w-20 h-20 text-yellow-500" />
                  ) : (
                    <XCircle className="w-20 h-20 text-red-500" />
                  )}
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {isWin ? "🎉 You Won! 🎉" : "Game Over!"}
                </h2>
                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  {winMessage}
                </p>

                {gameStats && (
                  <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-50 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Score</p>
                      <p className="text-xl font-bold text-purple-600">
                        {gameStats.finalScore}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Max Combo</p>
                      <p className="text-xl font-bold text-orange-500">
                        {gameStats.maxCombo}x
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Bonus</p>
                      <p className="text-xl font-bold text-green-500">
                        +
                        {(gameStats.timeBonus || 0) +
                          (gameStats.comboBonus || 0)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handlePlayAgain}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Play Again
                  </button>
                  <button
                    onClick={handleRefreshCards}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center gap-2"
                  >
                    <Dice5 className="w-4 h-4" />
                    New Cards
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={playAgain}
          className="fixed bottom-6 right-6 bg-linear-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
          title="Reset Game"
        >
          <RefreshCw className="w-6 h-6" />
        </motion.button>
      </div>
      <p className=" text-center text-xs text-gray-400 mt-1">
        {isPaused
          ? "⏸️ Game Paused - Resume to continue"
          : "▶️ Click cards to catch Pokémon"}
      </p>

      <footer className="mt-12 py-4 text-center text-gray-600 border-t border-gray-200">
        <p className="text-sm flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          Memory Card Game | Time Challenge | Combo System
          <Heart className="w-4 h-4 text-red-500" />
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Click each Pokémon only once | Timer: 60s | Combo multiplier for
          consecutive catches
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Made by{" "}
          <a
            href="https://github.com/Okoro91"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            mi okoro
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
