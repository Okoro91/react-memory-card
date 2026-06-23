# Pokémon Memory Card Game 🃏

A challenging memory card game built with React that tests your recall ability. Click unique Pokémon cards to earn points, but clicking the same card twice ends your streak! Features real-time score tracking, best score persistence, combo system, and timer mode.

## 🎮 Live Demo

**[Play the Game](https://mi-memory-card.vercel.app/)**

## ✨ Features

### Core Gameplay

- **Memory Challenge** - Click each Pokémon card only once to catch them all
- **Dynamic Card Shuffling** - Cards shuffle after every click for endless variety
- **Score Tracking** - Current score and persistent best score (saved in localStorage)
- **Win Condition** - Catch all Pokémon to win the game!

### Advanced Features

- **⚡ Combo System** - Build streaks with consecutive correct matches
  - Max combo tracking with visual celebrations
  - Multiplier bonuses for high combos
- **⏱️ Timer Mode** - 60-second countdown for each round
  - Visual indicators for time pressure
  - Bonus points for fast completions
- **🔊 Sound Effects** - Immersive audio feedback
  - Catch sounds, game over, win fanfare
  - Mute/unmute toggle
- **🎨 Card Flip Animation** - Smooth 3D card flips
  - Beautiful back design (Pokeball)
  - Spring physics for natural feel

### UI/UX Enhancements

- **Responsive Design** - Works on all screen sizes
- **Difficulty Levels** - Easy (6 cards), Medium (12 cards), Hard (16 cards)
- **Progress Tracking** - Visual progress bar with milestone indicators
- **Interactive Feedback** - Hover effects, animations, and celebration effects
- **Dark/Light Mode** (coming soon)

## 🛠️ Technologies

- **React 18** - UI Framework
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Confetti** - Win celebration effects
- **Pokémon API** - Card data and images

## 📁 Project Structure

```
src/
├── components/
│   ├── Card/
│   │   └── Card.jsx          # 3D flip card component
│   ├── Scoreboard/
│   │   └── Scoreboard.jsx    # Score, combo, timer display
│   ├── GameBoard/
│   │   └── GameBoard.jsx     # Card grid layout
│   ├── SoundToggle/
│   │   └── SoundToggle.jsx   # Audio controls
│   └── Header/
│       └── Header.jsx        # Game title and subtitle
├── hooks/
│   ├── useApiFetch.js        # Pokémon API data fetching
│   ├── useGameLogic.js       # Core game state management
│   └── useSound.js           # Sound effects system
├── utils/
│   ├── shuffleArray.js       # Fisher-Yates shuffle algorithm
│   └── localStorage.js       # Local storage helpers
├── App.jsx                   # Main application component
├── index.css                 # Tailwind v4 configuration
└── main.jsx                  # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Okoro91/react-memory-card.git

# Navigate to project directory
cd react-memory-card

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 How to Play

1. **Start the Game** - Cards appear face-down with a Pokeball design
2. **Click a Card** - It flips to reveal a Pokémon
3. **Remember Each Card** - Click only cards you haven't seen before
4. **Build Your Combo** - Consecutive correct clicks increase your multiplier
5. **Beat the Clock** - Catch all Pokémon before time runs out!
6. **Win Condition** - Click all unique cards to win

### Scoring System

- **Base Score** - +1 point per unique card clicked
- **Combo Bonus** - Multiplier increases with consecutive correct clicks
- **Time Bonus** - Extra points for fast completion
- **Best Score** - Automatically saved to localStorage

### Difficulty Levels

- 🟢 **Easy** - 6 cards (Perfect for beginners)
- 🟡 **Medium** - 12 cards (Balanced challenge)
- 🔴 **Hard** - 16 cards (For memory masters)

## 🎨 Color Palette

| Color          | Hex       | Usage                   |
| -------------- | --------- | ----------------------- |
| Primary Blue   | `#3B82F6` | Buttons, active states  |
| Primary Purple | `#9333EA` | Headers, gradients      |
| Success Green  | `#22C55E` | Score display, progress |
| Warning Yellow | `#EAB308` | Best score, combos      |
| Danger Red     | `#EF4444` | Game over states        |

## 🏗️ Architecture

### State Management

- **Custom Hooks** - Encapsulated game logic
- **useGameLogic** - Core game state (cards, score, combo, timer)
- **useApiFetch** - External API data management
- **useSound** - Audio controls and effects

### Component Design

- **Atomic Design** - Small, reusable components
- **Prop Drilling** - Explicit data flow
- **Conditional Rendering** - Loading, error, and success states

### Performance Optimizations

- **React.memo** - Prevent unnecessary re-renders
- **useCallback** - Memoized event handlers
- **useMemo** - Computed values caching
- **Lazy Loading** - Image optimization

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test

# Run test coverage
npm test -- --coverage
```

## 📦 Deployment

This project is deployed on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

**MI Okoro** - [GitHub](https://github.com/Okoro91)

Project Link: [https://github.com/Okoro91/react-memory-card](https://github.com/Okoro91/react-memory-card)

## 🙏 Acknowledgments

- [Pokémon API](https://pokeapi.co/) - Card data and images
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [React Confetti](https://github.com/alampros/react-confetti) - Celebration effects

## 🎯 Roadmap

- [ ] Dark/Light mode toggle
- [ ] Multiplayer mode
- [ ] Leaderboard with top scores
- [ ] Additional card themes
- [ ] Achievement system
- [ ] Mobile touch optimizations
- [ ] Progressive Web App (PWA) support

---

**Made with ❤️ and React** - Test your memory and catch all Pokémon!
