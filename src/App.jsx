import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Play,
  AlertCircle,
  Loader2,
  ChevronRight,
  Zap,
  Crown,
  Heart,
  XCircle,
} from "lucide-react";
import Header from "./components/Hearder/Header";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import GameBoard from "./components/GameBoard/GameBoard";
import { useApiFetch } from "./hooks/useApiFetch";
import { useGameLogic } from "./hooks/useGameLogic";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import { useSound } from "./hooks/useSound";
import SoundToggle from "./components/SoundToggle/SoundToggle";
import "./index.css";

const App = () => {
  const { cards: fetchedCards, loading, error } = useApiFetch();
  const { playSound, toggleMute, isMuted } = useSound();
  const [difficulty, setDifficulty] = useState(() =>
    getFromLocalStorage("difficulty", "medium"),
  );
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const getCardsByDifficulty = (allCards, diff) => {
    if (!allCards.length) return [];
    const difficultySettings = {
      easy: 6,
      medium: 8,
      hard: 16,
    };
    const count = difficultySettings[diff];
    return allCards.slice(0, count);
  };

  const currentCards = getCardsByDifficulty(fetchedCards, difficulty);

  const {
    cards,
    score,
    bestScore,
    gameOver,
    winMessage,
    isWin,
    combo,
    handleCardClick,
    playAgain,
    loading: gameLoading,
  } = useGameLogic(currentCards, playSound);

  useEffect(() => {
    saveToLocalStorage("difficulty", difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (gameOver) {
      setShowGameOverModal(true);
      // const timer = setTimeout(() => {
      //   setShowGameOverModal(false);
      //   playAgain();
      // }, 5000);
      // return () => clearTimeout(timer);
    }
  }, [gameOver]);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    playAgain();
  };

  const handlePlayAgain = () => {
    setShowGameOverModal(false);
    playAgain();
  };

  if (loading || gameLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100">
        <Header />
        <SoundToggle isMuted={isMuted} toggleMute={toggleMute} />
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
      {isWin && <Confetti recycle={false} numberOfPieces={900} gravity={0.2} />}

      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-2 inline-flex gap-2">
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
                  px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2
                  ${
                    difficulty === level
                      ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        <Scoreboard
          currentScore={score}
          bestScore={bestScore}
          totalCards={currentCards.length}
          combo={combo}
        />

        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          gameOver={gameOver}
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
                  {isWin ? "You Won!" : "Game Over!"}
                </h2>
                <p className="text-gray-600 mb-4 flex items-center justify-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {winMessage}
                </p>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">Your Score</p>
                  <p className="text-4xl font-bold text-purple-600">{score}</p>
                  {score === bestScore && score > 0 && (
                    <p className="text-green-600 mt-1 flex items-center justify-center gap-1">
                      <Crown className="w-4 h-4" />
                      New Record!
                    </p>
                  )}
                </div>
                <button
                  onClick={handlePlayAgain}
                  className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  Play Again
                </button>
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

      <footer className="mt-12 py-6 text-center text-gray-600 border-t border-gray-200">
        <p className="text-sm flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          Memory Card Game | Test your memory and catch all Pokémon!
          <Heart className="w-4 h-4 text-red-500" />
        </p>
      </footer>
    </div>
  );
};

export default App;
