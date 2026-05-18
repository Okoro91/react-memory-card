import React from "react";
import { useApiFetch } from "./hooks/useApiFetch";
import { useGameLogic } from "./hooks/useGameLogic";

const App = () => {
  const { cards: fetchedCards, loading, error } = useApiFetch();

  const {
    cards,
    score,
    bestScore,
    gameOver,
    winMessage,
    handleCardClick,
    playAgain,
  } = useGameLogic(fetchedCards);

  if (loading) {
    return <h1 className="text-3xl p-5">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-3xl p-5 text-red-500">{error}</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Pokémon Memory Game</h1>

          <div className="text-lg font-semibold">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
          </div>
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="bg-white p-4 rounded-lg shadow mb-6 text-center">
            <h2 className="text-2xl font-bold mb-3">{winMessage}</h2>

            <button
              onClick={playAgain}
              className="bg-blue-500 text-white px-5 py-2 rounded"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 transition"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 object-contain"
              />

              <h2 className="text-center mt-3 font-semibold capitalize">
                {card.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
