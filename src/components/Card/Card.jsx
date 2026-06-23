import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Volume2 } from "lucide-react";

const Card = ({ id, name, image, onClick, isDisabled, isFlipped = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [showParticles, setShowParticles] = useState(false);

  const handleClick = () => {
    if (!isDisabled && !isAnimating && !isFlipped) {
      setIsAnimating(true);
      setShowParticles(true);
      onClick(id);
      setTimeout(() => {
        setIsAnimating(false);
        setShowParticles(false);
      }, 300);
    }
  };

  return (
    <>
      {showParticles && (
        <div className="fixed pointer-events-none z-50">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: -100 - Math.random() * 50,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.8 }}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                boxShadow: "0 0 5px rgba(255, 255, 0, 0.5)",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative cursor-pointer preserve-3d"
        style={{ perspective: "1000px" }}
        whileHover={{ scale: isDisabled || isAnimating ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled || isAnimating ? 1 : 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={`
            relative bg-white rounded-xl shadow-md overflow-hidden
            transition-all duration-200
            ${!isDisabled && !isAnimating && "hover:shadow-xl hover:shadow-purple-200"}
            ${isDisabled && "opacity-50 cursor-not-allowed"}
            backface-hidden
          `}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative pb-[100%]">
              <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-contain p-4 bg-linear-to-br from-blue-50 to-purple-50"
                loading="lazy"
              />
            </div>

            {isHovered && !isDisabled && !isAnimating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-linear-to-t from-purple-600/80 to-transparent flex items-end justify-center pb-1"
              >
                <span className="text-white font-semibold text-sm md:text-base px-2 py-0.5 rounded-full bg-black/50 flex items-center gap-1">
                  <Gamepad2 className="w-3 h-3 md:w-4 md:h-4" />
                  Click
                </span>
              </motion.div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-sm md:text-base font-semibold text-center truncate flex items-center justify-center gap-1">
                {name}
                {!isDisabled && (
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                )}
              </p>
            </div>
          </div>

          <div
            className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden backface-hidden"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div className="relative w-full h-full bg-linear-to-br from-red-500 to-red-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-white shadow-lg">
                  <div className="absolute top-1/2 left-0 right-0 h-1/3 bg-gray-800"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full bg-gray-800">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-white"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full border-4 border-gray-800"></div>
                </div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-semibold">
                Pokémon Card
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Card;
