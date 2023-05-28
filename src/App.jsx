import { useState, useEffect } from "react";
import useSound from "use-sound";
import "./App.css";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Die from "./components/Die";
import ReactConfetti from "react-confetti";
import { push, onValue } from "firebase/database";
import { scoresInDB } from "./firebase";
import diceSfx from "./assets/dice.mp3";
import cheerSfx from "./assets/cheer.mp3";

let scores = [];
onValue(scoresInDB, function (snapshot) {
  scores = Object.entries(snapshot.val());
  scores.forEach((score) => {
    console.log(score[1].name, score[1].score);
  });
});

function App() {
  const [dice, setDice] = useState(generateNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [roll] = useSound(diceSfx);
  const [cheer] = useSound(cheerSfx)

  useEffect(() => {
    const heldValue = dice[0].value;
    if (
      dice.every((die) => die.isHeld === true) &&
      dice.every((die) => die.value === heldValue)
    ) {
      cheer()
      setTenzies(true);
      push(scoresInDB, {
        name: "name",
        score: rolls,
      });
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
      setRolls(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
      setRolls((prevRolls) => prevRolls + 1);
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
    <main className="flex min-w-[378px] flex-col items-center rounded-xl bg-[#F5F5F5] p-8">
      {tenzies && <ReactConfetti />}
      <Header />
      <section className="mb-9 grid grid-cols-5 gap-4">{diceEl}</section>
      <button
        onClick={rollDice}
        className="h-[45px] w-[120px] cursor-default rounded-md bg-[#5035FF] font-Karla text-white transition-shadow active:shadow-inner active:shadow-gray-900/75 md:cursor-pointer md:text-xl">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
