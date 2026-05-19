// components/Card/Card.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2 } from "lucide-react";

const Card = ({ id, name, image, onClick, isDisabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: isDisabled ? 1 : 1.05 }}
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer
        transition-all duration-200
        ${!isDisabled && "hover:shadow-xl hover:shadow-purple-200"}
        ${isDisabled && "opacity-50 cursor-not-allowed"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isDisabled && onClick(id)}
    >
      <div className="relative pb-[100%]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-4 bg-linear-to-br from-blue-50 to-purple-50"
          loading="lazy"
        />
      </div>

      {/* Card overlay on hover */}
      {isHovered && !isDisabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-linear-to-t from-purple-600/80 to-transparent flex items-end justify-center pb-4"
        >
          <span className="text-white font-bold text-sm md:text-base px-2 py-1 rounded-full bg-black/50 flex items-center gap-1">
            <Gamepad2 className="w-3 h-3 md:w-4 md:h-4" />
            Click to catch!
          </span>
        </motion.div>
      )}

      {/* Card name */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
        <p className="text-white text-sm md:text-base font-semibold text-center truncate flex items-center justify-center gap-1">
          {name}
          {!isDisabled && <Sparkles className="w-3 h-3 text-yellow-300" />}
        </p>
      </div>
    </motion.div>
  );
};

export default Card;
