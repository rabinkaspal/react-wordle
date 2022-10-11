import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import "./App.css";
// import words from "./data/wordDb";
import dictionary from "./data/dictionary";
import Footer from "./components/Footer";

function App() {
    const [solution, setSolution] = useState();
    const [words, setWords] = useState([]);

    useEffect(() => {
        const dictWords = Object.keys(dictionary).filter(
            dict => dict.length === 5
        );
        setWords(dictWords);
        const wordSize = dictWords.length;
        let wordIndex = Math.floor(Math.random() * wordSize);
        const solution = dictWords[wordIndex];
        setSolution(solution);
        console.log("solution", solution);
    }, []);

    return (
        <div className="App">
            <h1>React Wordle</h1>
            <Wordle solution={solution} words={words} />
            <Footer />
        </div>
    );
}

export default App;
