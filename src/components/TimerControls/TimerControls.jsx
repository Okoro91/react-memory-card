// components/TimerControls/TimerControls.jsx
import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Timer, Clock } from "lucide-react";

const TimerControls = ({
  isPaused,
  togglePause,
  isTimerActive,
  gameOver,
  timeLeft,
  formatTime,
  isLoading,
}) => {
  const isDisabled = gameOver || !isTimerActive || isLoading;
  const isTimeLow = timeLeft <= 10;

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
      <div
        className={`
        flex items-center gap-2 px-3 py-1 rounded-lg
        ${isTimeLow ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-50 text-blue-600"}
      `}
      >
        <Clock className="w-4 h-4" />
        <span className="font-mono font-bold text-lg">
          {formatTime(timeLeft)}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePause}
        disabled={isDisabled || timeLeft <= 0}
        className={`
          px-4 py-2 rounded-lg font-semibold 
          transition-all duration-200 flex items-center gap-2
          ${
            isDisabled || timeLeft <= 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : isPaused
                ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-md"
          }
        `}
        title={isPaused ? "Resume Game" : "Pause Game"}
      >
        {isPaused ? (
          <>
            <Play className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Resume</span>
          </>
        ) : (
          <>
            <Pause className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Pause</span>
          </>
        )}
      </motion.button>

      {isPaused && !gameOver && isTimerActive && timeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs text-orange-500 font-semibold flex items-center gap-1"
        >
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          PAUSED
        </motion.div>
      )}
    </div>
  );
};

export default TimerControls;
