import { useCallback, useRef, useState, useEffect } from "react";

export const useSound = () => {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("soundMuted") === "true";
  });

  const sounds = useRef({
    click: new Audio("/sounds/click.mp3"),
    catch: new Audio("/sounds/catch.wav"),
    gameOver: new Audio("/sounds/gameover.mp3"),
    win: new Audio("/sounds/win.wav"),
    shuffle: new Audio("/sounds/shuffle.mp3"),
    flip: new Audio("/sounds/flip.wav"), // Add flip sound
  });

  // Set volumes
  useEffect(() => {
    sounds.current.click.volume = 0.2;
    sounds.current.catch.volume = 0.3;
    sounds.current.gameOver.volume = 0.4;
    sounds.current.win.volume = 0.5;
    sounds.current.shuffle.volume = 0.2;
    sounds.current.flip.volume = 0.15;
  }, []);

  const playSound = useCallback(
    (soundName) => {
      if (isMuted) return;
      const sound = sounds.current[soundName];
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch((e) => console.log("Sound play failed:", e));
      }
    },
    [isMuted],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem("soundMuted", newState);
      return newState;
    });
  }, []);

  return { playSound, toggleMute, isMuted };
};
