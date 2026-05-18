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

  // Shuffle WITHOUT mutating original array
  const shuffleCards = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;

      setScore(newScore);
      setClickedCards([...clickedCards, id]);

      if (newScore > bestScore) {
        setBestscore(newScore);
      }
    }

    // Update state with shuffled cards
    setCards((prevCards) => shuffleCards(prevCards));
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
            className="w-40 h-40 bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition"
            onClick={() => handleCardClick(card.id)}
          >
            <img src={card.image} alt={card.name} />

            <p className="capitalize">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
