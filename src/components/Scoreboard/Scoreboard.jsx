// components/Scoreboard/Scoreboard.jsx - Add paused indicator
import React from "react";
import {
  Trophy,
  TrendingUp,
  Target,
  Star,
  Award,
  Sparkles,
  Zap,
  Timer,
  Crown,
  Flame,
  Clock,
  PauseCircle,
} from "lucide-react";

const Scoreboard = ({
  currentScore,
  bestScore,
  totalCards,
  combo,
  maxCombo,
  timeLeft,
  formatTime,
  isTimerActive,
  isPaused,
  gameOver,
}) => {
  const progress = (currentScore / totalCards) * 100;
  const isTimeLow = timeLeft <= 10;
  const isTimeVeryLow = timeLeft <= 5;

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* Score */}
        <div className="flex items-center justify-center space-x-2 bg-linear-to-r from-green-50 to-green-100 p-1 rounded-lg">
          <div className="flex flex-row items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <p className="text-base text-gray-600 font-bold scale-105">
              Score:
            </p>
            <p className="text-2xl font-bold text-green-600">{currentScore}</p>
          </div>
        </div>

        {/* Best Score */}
        <div className="flex items-center justify-center space-x-2 bg-linear-to-r from-yellow-50 to-yellow-100  py-3 rounded-lg relative">
          <div className="flex flex-row items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <p className="text-base text-gray-600  font-bold scale-105">
              Best Score
            </p>
            <p className="text-2xl font-bold text-yellow-600">{bestScore}</p>
          </div>
          {currentScore === bestScore && bestScore > 0 && (
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 animate-pulse" />
          )}
        </div>

        {/* Combo */}
        <div className="flex items-center fles-col justify-center space-x-2 bg-linear-to-r from-orange-50 to-red-50 p-2 rounded-lg">
          <div className="flex flex-row items-center gap-2">
            <Flame
              className={`w-6 h-6 ${combo > 2 ? "text-orange-500 animate-pulse" : "text-gray-400"}`}
            />
            <p className="text-base text-gray-600  font-bold scale-105">
              Combo
            </p>
            <p
              className={`text-2xl font-bold ${combo > 2 ? "text-orange-500" : "text-gray-400"}`}
            >
              {combo}x
            </p>
          </div>
          {maxCombo > 0 && (
            <p className="text-xs text-gray-500">(Max: {maxCombo}x)</p>
          )}
        </div>

        {/* Timer with Pause Indicator */}
        <div
          className={`
          flex items-center justify-center space-x-2 p-2 rounded-lg relative
          ${
            isPaused
              ? "bg-linear-to-r from-gray-50 to-gray-100"
              : isTimeVeryLow
                ? "bg-linear-to-r from-red-50 to-red-100 animate-pulse"
                : isTimeLow
                  ? "bg-linear-to-r from-yellow-50 to-yellow-100"
                  : "bg-linear-to-r from-blue-50 to-blue-100"
          }
        `}
        >
          <div className="flex flex-row items-center gap-2">
            {isPaused ? (
              <PauseCircle className="w-6 h-6 text-gray-600" />
            ) : (
              <Clock
                className={`w-6 h-6 ${isTimeVeryLow ? "text-red-600" : isTimeLow ? "text-yellow-600" : "text-blue-600"}`}
              />
            )}
            <p className="text-base text-gray-600  font-bold scale-105">
              {isPaused ? "Paused" : "Time"}
            </p>
            <p
              className={`text-2xl font-bold ${
                isPaused
                  ? "text-gray-600"
                  : isTimeVeryLow
                    ? "text-red-600"
                    : isTimeLow
                      ? "text-yellow-600"
                      : "text-blue-600"
              }`}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
          {isPaused && (
            <div className="absolute -top-1 -right-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar with Combo indicator */}
      <div className="mt-3 relative">
        <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`bg-linear-to-r from-green-500 via-yellow-500 to-purple-600 h-full transition-all duration-300 rounded-full
              ${isPaused ? "opacity-50" : ""}
            `}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-600">
            {currentScore}/{totalCards} caught
          </p>
          {isPaused && !gameOver && (
            <p className="text-xs text-orange-500 font-bold flex items-center gap-1 animate-pulse">
              <PauseCircle className="w-3 h-3" />
              PAUSED
            </p>
          )}
          {combo > 2 && !isPaused && (
            <p className="text-xs text-orange-500 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {combo}x combo!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
