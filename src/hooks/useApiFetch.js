import { useState, useEffect, useRef } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=50";
const POKEMON_IMAGES =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export const useApiFetch = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }

        const data = await response.json();

        const fetchedCards = data.results.map((pokemon, index) => {
          const pokemonId = index + 1;
          return {
            id: pokemonId,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            image: `${POKEMON_IMAGES}${pokemonId}.png`,
            clicked: false,
          };
        });

        setCards(fetchedCards);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return { cards, loading, error, setCards };
};
