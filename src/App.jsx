import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Header from "./components/Header";
import Die from "./components/Die";
import Endscreen from "./components/Endscreen";

import ReactConfetti from "react-confetti";

import useSound from "use-sound";
import diceSfx from "./assets/dice.mp3";
import cheerSfx from "./assets/cheer.mp3";

function App() {
  const [dice, setDice] = useState(generateNewDice());
  const [rolls, setRolls] = useState(0);
  const [tenzies, setTenzies] = useState(false);
  const [isHighScore, setIsHighScore] = useState(false);
  const [roll] = useSound(diceSfx);
  const [cheer, { stop }] = useSound(cheerSfx);

  useEffect(() => {
    const heldValue = dice[0].value;
    if (
      dice.every((die) => die.isHeld === true) &&
      dice.every((die) => die.value === heldValue)
    ) {
      cheer();
      setTenzies(true);
      const scoreInLS = JSON.parse(localStorage.getItem("score"));
      if (!scoreInLS || rolls < scoreInLS) {
        setIsHighScore(true);
        localStorage.setItem("score", rolls);
      }
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }
  function generateNewDice() {
    return new Array(10).fill(0).map(() => generateNewDie());
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (tenzies) {
      stop();
      setDice(generateNewDice());
      setTenzies(false);
      setRolls(0);
      setIsHighScore(false);
    } else {
      setRolls((prevRolls) => prevRolls + 1);
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    }
    roll();
  }

  const diceEl = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));
  return (
    <main className="relative flex h-[425px] w-[90%] min-w-[335px] max-w-[400px] flex-col items-center justify-center overflow-hidden rounded-xl bg-[#F5F5F5] px-2 py-8 sm:w-[400px] sm:px-8">
      {tenzies ? (
        <>
          <ReactConfetti />
          <Endscreen
            currentScore={rolls}
            bestScore={JSON.parse(localStorage.getItem("score"))}
            isHighScore={isHighScore}
          />
        </>
      ) : (
        <>
          <Header />
          <section className="mb-9 grid h-full grid-cols-5 gap-4">
            {diceEl}
          </section>
        </>
      )}
      <button
        onClick={rollDice}
        className="min-h-[45px] w-[120px] cursor-default rounded-md bg-[#5035FF] font-Karla text-white transition-shadow active:shadow-inner   active:shadow-gray-900/75 md:cursor-pointer md:text-xl">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
