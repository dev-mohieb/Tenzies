import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Die from "./components/Die";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(generateNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const heldValue = dice[0].value;
    if (
      dice.every((die) => die.isHeld === true) &&
      dice.every((die) => die.value === heldValue)
    ) {
      setTenzies(true);
      console.log("you won");
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
    return new Array(10).fill(0).map(() => {
      return generateNewDie();
    });
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
      setDice(generateNewDice());
      setTenzies(false);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    }
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
    <main className="flex flex-col items-center rounded-xl min-w-[378px] bg-[#F5F5F5] p-8">
      {tenzies && <ReactConfetti />}
      <Header />
      <section className="mb-9 grid grid-cols-5 gap-4">{diceEl}</section>
      <button
        onClick={rollDice}
        className="h-[35px] w-[100px] cursor-default rounded-md bg-[#5035FF] font-Karla text-white transition-shadow active:shadow-inner active:shadow-gray-900/75 md:h-[45px] md:w-[120px] md:cursor-pointer md:text-xl">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
