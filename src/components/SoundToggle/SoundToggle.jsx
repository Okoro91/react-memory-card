import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const SoundToggle = ({ isMuted, toggleMute }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className="fixed top-20 right-6 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      title={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-gray-600" />
      ) : (
        <Volume2 className="w-5 h-5 text-purple-600" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
