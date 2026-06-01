import { useCallback, useRef, useState } from "react";

const createAudio = (src, volume = 0.5) => {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
};

export const useSound = () => {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("isMuted") === "true";
  });

  const sounds = useRef({
    click: createAudio("/sounds/click.mp3", 0.5),
    catch: createAudio("/sounds/catch.wav", 0.5),
    gameOver: createAudio("/sounds/gameover.mp3", 0.7),
    win: createAudio("/sounds/win.wav", 0.7),
    shuffle: createAudio("/sounds/shuffle.mp3", 0.5),
  });

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
      localStorage.setItem("isMuted", newState);
      return newState;
    });
  }, []);

  return { playSound, toggleMute, isMuted };
};
