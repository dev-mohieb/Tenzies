function NewScore(props) {
  return (
    <section className="border-b-2 border-b-gray-300 text-center">
      <h2 className="my-2 text-8xl">{props.score}</h2>
    </section>
  );
}

function PrevScore(props) {
  return (
    <section className="mb-4 mt-auto text-2xl">
      <p>Best Score: {props.bestScore}</p>
    </section>
  );
}

export default function Endscreen(props) {
  return (
    <section className="flex h-full w-full flex-col items-center overflow-hidden text-center">
      <NewScore score={props.currentScore} />
      <p className="col-span-3 mt-4 text-5xl">
        {props.isHighScore ? "Highscore!" : "You Won!"}
      </p>
      <PrevScore score={props.currentScore} bestScore={props.bestScore} />
    </section>
  );
}
