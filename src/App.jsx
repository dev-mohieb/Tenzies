import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(generateNewDice());
  function generateNewDice() {
    return new Array(10).fill(0).map((num) => {
      return {
        value: Math.ceil(Math.random() * 6),
        id: "no",
        isHeld: false,
      };
    });
  }
  const diceEl = generateNewDice().map((num) => (
    <Die value={num.value} id={num.id} isHeld={num.isHeld} />
  ));
  return (
    <main className="bg-[#F5F5F5] ">
      <Header />
      <section className="grid grid-cols-5">
        {diceEl}
      </section>
    </main>
  );
}

export default App;
