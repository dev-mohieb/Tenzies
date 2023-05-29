function Highscore(props) {
  return (
    <section className="col-span-3 self-start border-b-2 border-b-gray-300 text-center">
      <p className="text-2xl">New Highscore!</p>
      <h2 className="my-2 text-8xl">{props.score}</h2>
    </section>
  );
}

function Score(props) {
  return (
    <section className="col-span-3 text-2xl">
      <p>Score: {props.score}</p>
      <p>Best Score: {props.bestScore}</p>
    </section>
  );
}

export default function Endscreen(props) {
  return (
    <section className="grid h-full w-full grid-cols-3 place-items-center overflow-hidden text-center">
      {props.isHighScore && <Highscore score={props.bestScore} />}
      <p className="col-span-3 text-5xl">You Won!</p>
      <Score score={props.currentScore} bestScore={props.bestScore} />
    </section>
  );
}
