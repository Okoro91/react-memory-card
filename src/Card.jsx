import { p } from "framer-motion/client";
import React from "react";

const Card = () => {
  const [cards, setCards] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestscore] = React.useState(0);
  const [clickedCards, setClickedCards] = React.useState([]);

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

      const data = await res.json();

      // Fetch details for each Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(async (poke) => {
          const res = await fetch(poke.url);
          const pokeData = await res.json();

          return {
            id: pokeData.id,
            name: pokeData.name,
            image: pokeData.sprites.front_default,
          };
        }),
      );

      setCards(pokemonDetails);
    };

    fetchPokemon();
  }, []);

  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      setScore(score + 1);
      setClickedCards([...clickedCards, id]);
      if (score + 1 > bestScore) {
        setBestscore(score + 1);
      }
    }
    shuffleCards(cards);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Memory Card Game</h1>
      <p className="text-xl font-semibold">Score: {score}</p>
      <p className="text-lg">Best Score: {bestScore}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-40 h-40 bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleCardClick(card.id)}
          >
            <img className="" src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
