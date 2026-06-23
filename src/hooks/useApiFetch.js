import { useState, useEffect, useRef, useCallback } from "react";
import { shuffleArray } from "../utils/shuffleArray";

// const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=50";
const POKEMON_IMAGES =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export const useApiFetch = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const fetchedRef = useRef(false);

  const fetchPokemons = useCallback(async (offset = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }

      const data = await response.json();

      const shuffledResults = shuffleArray([...data.results]);

      const fetchedCards = shuffledResults.map((pokemon) => {
        const urlParts = pokemon.url.split("/");
        const pokemonId = urlParts[urlParts.length - 2];
        return {
          id: parseInt(pokemonId),
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          image: `${POKEMON_IMAGES}${pokemonId}.png`,
          clicked: false,
        };
      });

      setCards(fetchedCards);
      setCurrentOffset(offset);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching Pokémon:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchPokemons(0);
    }
  }, [fetchPokemons]);

  const refreshCards = useCallback(() => {
    const newOffset = currentOffset + 20;
    fetchPokemons(newOffset);
  }, [currentOffset, fetchPokemons]);

  return {
    cards,
    loading,
    error,
    refreshCards,
    currentOffset,
  };
};
