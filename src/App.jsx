import React from "react";
import { shuffleArray } from "./utils/shuffleArray";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage";

const cardsList = ["🐶", "🐱", "🐸", "🐵", "🦊"];

const App = () => {
  const [cards, setCards] = React.useState(cardsList);
  const [name, setName] = React.useState("");
  const [getUser, setGetUser] = React.useState(getFromLocalStorage("user", ""));
  const [saveUser, getSaveUser] = React.useState(
    saveToLocalStorage("user", name),
  );

  const handleSave = () => {
    getSaveUser(saveToLocalStorage("user", name));
    setGetUser(getFromLocalStorage("user", ""));
    alert("Name saved to local storage!");
  };

  const handleCardClick = () => {
    setCards((prevCards) => shuffleArray(prevCards));
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">localStorage Test</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        className="p-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
      >
        Save Name
      </button>
      <p>Saved Name: {getUser || "No name saved yet."}</p>
      <p>Saved Name: {name}</p>

      <h1>Memory Card Game</h1>
      <div>
        {cards.map((card, index) => (
          <span
            onClick={() => handleCardClick()}
            key={index}
            className="text-4xl m-4 cursor-pointer transition-transform duration-300 hover:scale-110
          "
          >
            {card}
          </span>
        ))}
      </div>
      <button
        className="p-2 bg-red-600 m-6 text-white rounded"
        onClick={() => handleCardClick()}
      >
        Shuffle Cards
      </button>
    </>
  );
};

export default App;
