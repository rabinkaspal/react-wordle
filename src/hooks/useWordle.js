import { useState } from "react";

const useWordle = (words, solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]); // [[{key: "a", color: "green"}, {key: "s", color:"grey"}]]
    const [wordHistory, setWordHistory] = useState([]); //["words", "story"]
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({}); //{a: "green", s: "yellow"}
    //error handling
    const [errorMsg, setErrorMsg] = useState("");

    const resetGame = () => {
        setTurn(0);
        setCurrentGuess("");
        setGuesses([...Array(6)]);
        setWordHistory([]);
        setIsCorrect(false);
        setErrorMsg("");
    };

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution];

        let formattedGuess = [...currentGuess].map(l => {
            return { key: l, color: "grey" };
        });

        //find green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                solutionArray[i] = null;
                formattedGuess[i].color = "green";
            }
        });

        //find yellow letter; if green, ignore
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== "green") {
                solutionArray[solutionArray.indexOf(l.key)] = null;
                formattedGuess[i].color = "yellow";
            }
        });
        return formattedGuess;
    };

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = formattedGuess => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses(prevGuesses => {
            let guesses = [...prevGuesses];
            guesses[turn] = formattedGuess;
            return guesses;
        });

        setWordHistory(history => [...history, currentGuess]);
        setTurn(prevTurn => prevTurn + 1);

        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
                let currentColor = prevUsedKeys[l.key];
                let keyColor = l.color;

                if (keyColor === "green") {
                    prevUsedKeys[l.key] = "green";
                    return;
                }

                if (keyColor === "yellow" && currentColor !== "green") {
                    prevUsedKeys[l.key] = "yellow";
                    return;
                }

                if (
                    keyColor === "grey" &&
                    currentColor !== ("green" || "yellow")
                ) {
                    prevUsedKeys[l.key] = "grey";
                    return;
                }
            });

            return prevUsedKeys;
        });
        setErrorMsg("");
        setCurrentGuess("");
    };

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyUp = ({ key }) => {
        if (key === "Enter") {
            // only add guess if turn is less than 5
            // do not allow duplicate words
            // check word is 5 chars
            if (turn > 5) {
                setErrorMsg("You've used all your guesses!!");
                console.log("you used all your guesses!");
                return;
            }
            if (wordHistory.includes(currentGuess)) {
                setErrorMsg("You've already tried that word!!");
                console.log("you already tried that word.");
                return;
            }
            if (currentGuess.length < 5) {
                setErrorMsg("Word Incomplete!!");
                console.log("word must be 5 chars.");
                return;
            }
            if (!words.includes(currentGuess)) {
                setErrorMsg("No such words in library!!.");
                console.log("no words in library");
                return;
            }
            addNewGuess(formatGuess());
        }
        if (key === "Backspace") {
            setErrorMsg("");
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key.toLowerCase());
            }
        }
    };

    return {
        currentGuess,
        setCurrentGuess,
        turn,
        guesses,
        isCorrect,
        handleKeyUp,
        errorMsg,
        setErrorMsg,
        resetGame,
        usedKeys,
    };
};

export default useWordle;
