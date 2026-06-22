import React from "react";
import {
  Trophy,
  TrendingUp,
  Target,
  Star,
  Award,
  Sparkles,
  Zap,
  RefreshCw,
} from "lucide-react";

const Scoreboard = ({ currentScore, bestScore, totalCards, combo }) => {
  const progress = (currentScore / totalCards) * 100;
  const [flipCount, setFlipCount] = React.useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-center space-x-3 bg-linear-to-r from-green-50 to-green-100 p-3 rounded-lg">
          <TrendingUp className="w-8 h-8 text-green-600" />
          <div className="text-center">
            <p className="text-sm text-gray-600 font-semibold">Current Score</p>
            <p className="text-3xl font-bold text-green-600">{currentScore}</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 bg-linear-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg relative">
          <Trophy className="w-8 h-8 text-yellow-600" />
          <div className="text-center">
            <p className="text-sm text-gray-600 font-semibold">Best Score</p>
            <p className="text-3xl font-bold text-yellow-600">{bestScore}</p>
          </div>
          {currentScore === bestScore && bestScore > 0 && (
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-500 animate-pulse" />
          )}
        </div>

        <div className="flex items-center justify-center space-x-3 bg-linear-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
          <Target className="w-8 h-8 text-purple-600" />
          <div className="text-center">
            <p className="text-sm text-gray-600 font-semibold">Progress</p>
            <p className="text-3xl font-bold text-purple-600">
              {currentScore}/{totalCards}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 bg-linear-to-r from-orange-50 to-red-50 p-3 rounded-lg">
          <Zap
            className={`w-8 h-8 ${combo > 0 ? "text-orange-500 animate-pulse" : "text-gray-400"}`}
          />
          <div className="text-center">
            <p className="text-sm text-gray-600 font-semibold">Combo</p>
            <p
              className={`text-3xl font-bold ${combo > 0 ? "text-orange-500" : "text-gray-400"}`}
            >
              {combo}x
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 relative">
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-linear-to-r from-green-500 to-purple-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <div className="absolute -top-6 right-0">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-50 to-indigo-100 p-3 rounded-lg">
        <RefreshCw className="w-8 h-8 text-indigo-600" />
        <div className="text-center">
          <p className="text-sm text-gray-600 font-semibold">Total Flips</p>
          <p className="text-3xl font-bold text-indigo-600">{flipCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
