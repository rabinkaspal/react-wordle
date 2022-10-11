import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import Keypad from "./Keypad";
import letters from "../data/letters";

const Wordle = ({ words, solution }) => {
    const {
        currentGuess,
        setCurrentGuess,
        guesses,
        isCorrect,
        turn,
        handleKeyUp,
        errorMsg,
        setErrorMsg,
        resetGame,
        usedKeys,
    } = useWordle(words, solution);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);
        if (isCorrect || turn > 5) {
            setTimeout(() => setShowModal(true), 1500);
            window.removeEventListener("keyup", handleKeyUp);
        }
        return () => window.removeEventListener("keyup", handleKeyUp);
    }, [handleKeyUp, isCorrect, turn]);

    const closeModal = () => {
        setShowModal(prev => !prev);
        navigate("/newgame");
    };

    return (
        <div className="main">
            {showModal && (
                <Modal
                    isCorrect={isCorrect}
                    turn={turn}
                    solution={solution}
                    resetGame={resetGame}
                    closeModal={closeModal}
                />
            )}
            <div className="moves">Moves: {turn}/6</div>
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            {errorMsg && (
                <div className="error">
                    <p>{errorMsg}</p>
                    <button
                        onClick={() => {
                            setErrorMsg("");
                            setCurrentGuess("");
                        }}
                    >
                        X
                    </button>
                </div>
            )}
            <Keypad letters={letters} usedKeys={usedKeys} />
        </div>
    );
};

export default Wordle;
