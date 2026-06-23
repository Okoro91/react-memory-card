// components/CardDeck/NewCardsButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Dice5, Sparkles } from "lucide-react";

const NewCardsButton = ({ onRefresh, isLoading, disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRefresh}
      disabled={disabled || isLoading}
      className={`
        bg-linear-to-r from-purple-600 to-pink-600 
        text-white px-2 py-3 rounded-xl font-bold 
        shadow-lg hover:shadow-xl 
        transition-all duration-200
        flex items-center gap-1
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {isLoading ? (
        <>
          <RefreshCw className="w-5 h-5 animate-spin" />
          Loading New Cards...
        </>
      ) : (
        <>
          <Dice5 className="w-5 h-5" />
          <span>Refresh Cards</span>
          <Sparkles className="w-4 h-4" />
        </>
      )}
    </motion.button>
  );
};

export default NewCardsButton;
