import popSfx from "../assets/pop.mp3";
import useSound from "use-sound";

export default function Die(props) {
  const [play] = useSound(popSfx);
  const dots = new Array(props.value)
    .fill("")
    .map((dot) => <div className="circle"></div>);
  let cls = "";
  if (props.value === 1) {
    cls = "one";
  } else if (props.value === 2) {
    cls = "two";
  } else if (props.value === 3) {
    cls = "three";
  } else if (props.value === 4) {
    cls = "four";
  } else if (props.value === 5) {
    cls = "five";
  } else if (props.value === 6) {
    cls = "six";
  }

  return (
    <section
      onClick={() => {
        props.holdDie();
        play();
      }}
      className={`${cls} grid h-[50px] w-[50px] grid-cols-3 grid-rows-3 place-items-center rounded-md p-2 transition-colors md:h-[60px] md:w-[60px] md:cursor-pointer ${
        props.isHeld ? "bg-green-400" : "bg-white"
      } text-[20px] shadow-md md:text-[24px]`}>
      {dots}
    </section>
  );
}
