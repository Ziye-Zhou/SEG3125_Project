const e = React.createElement;
const { useState, useEffect } = React;

const allCards = [
    { id: 1, lift: "Squat", cue: "Brace before descent", image: "images/memory_game/S1.JPG" },
    { id: 2, lift: "Squat", cue: "Push knees out", image: "images/memory_game/S1.JPG" },
    { id: 3, lift: "Squat", cue: "Keep chest up", image: "images/memory_game/S2.JPG" },
    { id: 4, lift: "Squat", cue: "Keep heels grounded", image: "images/memory_game/S2.JPG" },
    { id: 5, lift: "Squat", cue: "Control the depth", image: "images/memory_game/S1.JPG" },

    { id: 6, lift: "Bench", cue: "Retract shoulder blades", image: "images/memory_game/B1.JPG" },
    { id: 7, lift: "Bench", cue: "Keep feet planted", image: "images/memory_game/B1.JPG" },
    { id: 8, lift: "Bench", cue: "Use leg drive", image: "images/memory_game/B2.JPG" },
    { id: 9, lift: "Bench", cue: "Control the bar path", image: "images/memory_game/B2.JPG" },
    { id: 10, lift: "Bench", cue: "Press with stability", image: "images/memory_game/B1.JPG" },

    { id: 11, lift: "Deadlift", cue: "Keep the bar close", image: "images/memory_game/D1.JPG" },
    { id: 12, lift: "Deadlift", cue: "Keep a neutral spine", image: "images/memory_game/D1.JPG" },
    { id: 13, lift: "Deadlift", cue: "Push the floor away", image: "images/memory_game/D2.JPG" },
    { id: 14, lift: "Deadlift", cue: "Lock out with hips", image: "images/memory_game/D2.JPG" },
    { id: 15, lift: "Deadlift", cue: "Brace before pulling", image: "images/memory_game/D1.JPG" }
];

const levels = [
    { level: 0, cards: 6 },
    { level: 1, cards: 12 },
    { level: 2, cards: 16 },
    { level: 3, cards: 20 },
    { level: 4, cards: 24 },
    { level: 5, cards: 30 }
];

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function buildGameCards(pairCount) {
    const squatCards = allCards.filter(card => card.lift === "Squat");
    const benchCards = allCards.filter(card => card.lift === "Bench");
    const deadliftCards = allCards.filter(card => card.lift === "Deadlift");

    const groups = [squatCards, benchCards, deadliftCards];
    const selectedFaces = [];

    let round = 0;

    while (selectedFaces.length < pairCount) {
        const groupIndex = selectedFaces.length % groups.length;
        const currentGroup = groups[groupIndex];

        if (round < currentGroup.length) {
            selectedFaces.push(currentGroup[round]);
        }

        if (groupIndex === groups.length - 1) {
            round++;
        }
    }

    const pairedCards = selectedFaces.flatMap(card => [
        { ...card, uniqueId: `${card.id}-a` },
        { ...card, uniqueId: `${card.id}-b` }
    ]);

    return shuffleArray(pairedCards);
}

function MemoryGameApp() {
    const [screen, setScreen] = useState("levels");
    const [selectedMode, setSelectedMode] = useState("image");
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [selectedPairs, setSelectedPairs] = useState(3);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedIds, setMatchedIds] = useState([]);
    const [moves, setMoves] = useState(0);
    const [feedback, setFeedback] = useState("Flip two cards and find the matching lifting cue.");
    const [gameComplete, setGameComplete] = useState(false);

    function startLevel(levelNumber) {
        const levelData = levels.find(item => item.level === levelNumber);
        const pairCount = levelData.cards / 2;

        setSelectedLevel(levelData.level);
        setSelectedPairs(pairCount);
        setCards(buildGameCards(pairCount));
        setFlippedCards([]);
        setMatchedIds([]);
        setMoves(0);
        setFeedback("Flip two cards and find the matching lifting cue.");
        setGameComplete(false);
        setScreen("game");

        window.scrollTo(0, 0);
    }

    function returnToLevels() {
        setScreen("levels");
        setCards([]);
        setFlippedCards([]);
        setMatchedIds([]);
        setGameComplete(false);
        setFeedback("Flip two cards and find the matching lifting cue.");
        window.scrollTo(0, 0);
    }

    function goToNextLevel() {
        if (selectedLevel < 5) {
            startLevel(selectedLevel + 1);
        } else {
            startLevel(0);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const mode = params.get("mode");
        const start = params.get("start");

        if (mode === "image" || mode === "cue") {
            setSelectedMode(mode);
        }

        if (start === "0" && (mode === "image" || mode === "cue")) {
            setSelectedMode(mode);
            startLevel(0);
        }
    }, []);

    function handleCardClick(card) {
        if (gameComplete) return;
        if (matchedIds.includes(card.id)) return;
        if (flippedCards.some(openCard => openCard.uniqueId === card.uniqueId)) return;

        let currentFlipped = flippedCards;

        if (currentFlipped.length === 2) {
            currentFlipped = [];
        }

        const newFlipped = [...currentFlipped, card];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prevMoves => prevMoves + 1);

            const firstCard = newFlipped[0];
            const secondCard = newFlipped[1];

            if (firstCard.id === secondCard.id) {
                const newMatchedIds = [...matchedIds, firstCard.id];

                setMatchedIds(newMatchedIds);
                setFlippedCards([]);
                setFeedback("Correct! You matched the same lifting cue.");

                if (newMatchedIds.length === selectedPairs) {
                    setFeedback("Great job! You completed the memory challenge.");
                    setGameComplete(true);
                }
            } else {
                setFeedback("Sorry, that’s incorrect. Try another pair.");
            }
        }
    }

    function isCardOpen(card) {
        return flippedCards.some(openCard => openCard.uniqueId === card.uniqueId);
    }

    function isCardMatched(card) {
        return matchedIds.includes(card.id);
    }

    if (screen === "levels") {
        return e("main", { className: "memory-home-section" },
            e("div", { className: "container" },

                e("h1", { className: "memory-main-title" },
                    "MN Powerlifting Technique Memory Game"
                ),

                e("p", { className: "memory-subtitle" },
                    "Match cards to remember lifting cues!"
                ),

                e("div", { className: "game-option-box" },
                    e("h2", { className: "option-title" }, "Choose Display Mode"),

                    e("div", { className: "option-buttons" },

                        e("label", { className: "option-choice" },
                            e("input", {
                                type: "radio",
                                name: "displayMode",
                                value: "image",
                                checked: selectedMode === "image",
                                onChange: () => setSelectedMode("image")
                            }),
                            e("span", null, "Image + Cue")
                        ),

                        e("label", { className: "option-choice" },
                            e("input", {
                                type: "radio",
                                name: "displayMode",
                                value: "cue",
                                checked: selectedMode === "cue",
                                onChange: () => setSelectedMode("cue")
                            }),
                            e("span", null, "Cue Focus")
                        )
                    )
                ),

                e("div", { className: "level-list" },
                    levels.map(level =>
                        e("button", {
                            key: level.level,
                            className: "level-row",
                            type: "button",
                            onClick: () => startLevel(level.level)
                        },
                            e("span", { className: "level-badge" }, `Level ${level.level}`),

                            e("span", { className: "level-info" },
                                e("span", { className: "card-count" }, `${level.cards} Cards`),
                                e("span", { className: "pair-count" }, `${level.cards / 2} Pairs`)
                            ),

                            e("span", { className: "play-arrow" }, "▶")
                        )
                    )
                )
            )
        );
    }

    return e("section", { className: "game-section" },
        e("div", { className: "container" },

            e("div", { className: "game-header" },
                e("button", {
                    className: "back-btn",
                    type: "button",
                    onClick: returnToLevels
                }, "← Back to Levels"),

                e("div", { className: "game-stats" },
                    e("span", null, `Level ${selectedLevel}`),
                    e("span", null, `Moves: ${moves}`),
                    e("span", null, `Matches: ${matchedIds.length} / ${selectedPairs}`),
                    e("span", null, selectedMode === "image" ? "Image + Cue Mode" : "Cue Focus Mode")
                )
            ),

            e("h1", { className: "game-title" }, "MN Powerlifting Technique Memory Game"),

            e("p", { className: "game-subtitle" },
                "Match cards to remember lifting cues!"
            ),

            e("p", { className: "feedback-text" }, feedback),

            e("div", { className: "game-board-wrapper" },

                e("div", { className: "card-grid" },
                    cards.map(card => {
                        const open = isCardOpen(card);
                        const matched = isCardMatched(card);

                        return e("button", {
                            key: card.uniqueId,
                            className: `memory-card ${open ? "flipped" : ""} ${matched ? "matched" : ""}`,
                            type: "button",
                            onClick: () => handleCardClick(card)
                        },
                            e("div", { className: "card-inner" },

                                e("div", { className: "card-back" }, "SBD"),

                                e("div", {
                                    className: selectedMode === "cue" ? "card-front cue-focus-front" : "card-front"
                                },
                                    selectedMode === "image"
                                        ? [
                                            e("img", {
                                                key: "img",
                                                src: card.image,
                                                alt: `${card.lift} technique card`
                                            }),

                                            e("div", { key: "overlay", className: "card-overlay" },
                                                e("span", { className: "lift-name" }, card.lift),
                                                e("span", { className: "cue-text" }, card.cue)
                                            )
                                        ]
                                        : e("div", { className: "cue-focus-content" },
                                            e("span", null, card.cue)
                                        )
                                )
                            )
                        );
                    })
                ),

                gameComplete &&
                e("div", { className: "end-overlay" },
                    e("div", { className: "end-modal" },

                        e("div", { className: "end-top" },
                            e("span", { className: "end-check" }, "✓"),
                            e("h2", null, `Level ${selectedLevel}`)
                        ),

                        e("h3", null, "Congratulations!"),

                        e("p", null, `You found all ${selectedPairs} pairs in ${moves} moves.`),

                        e("div", { className: "end-buttons" },
                            e("button", {
                                className: "game-action-btn",
                                type: "button",
                                onClick: () => startLevel(selectedLevel)
                            }, "Play Again"),

                            e("button", {
                                className: "game-action-btn secondary-btn",
                                type: "button",
                                onClick: goToNextLevel
                            }, "Next Level")
                        )
                    )
                )
            )
        )
    );
}

const rootElement = document.getElementById("memoryGameRoot");
const root = ReactDOM.createRoot(rootElement);
root.render(e(MemoryGameApp));