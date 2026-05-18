A memory card game built with React that tests your recall ability. Click unique cards to earn points, but clicking the same card twice ends your streak! Features real-time score tracking, best score persistence, and dynamic card shuffling. Fetches character images from an external API.

### Folder Structure

src/
├── components/
│ ├── Card/
│ │ ├── Card.jsx
│ │ └── Card.module.css
│ ├── Scoreboard/
│ │ ├── Scoreboard.jsx
│ │ └── Scoreboard.module.css
│ ├── GameBoard/
│ │ ├── GameBoard.jsx
│ │ └── GameBoard.module.css
│ └── Header/
│ ├── Header.jsx
│ └── Header.module.css
├── hooks/
│ ├── useGameLogic.js
│ └── useApiFetch.js
├── utils/
│ ├── shuffleArray.js
│ └── localStorage.js
├── App.jsx
├── App.module.css
└── main.jsx
