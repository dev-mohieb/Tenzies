export default function Die(props) {
  return (
    <section
      onClick={props.holdDie}
      className={`grid h-[50px] w-[50px] place-items-center rounded-md transition-colors md:h-[60px] md:w-[60px] md:cursor-pointer ${
        props.isHeld ? "bg-green-400" : "bg-white"
      } text-[20px] shadow-md md:text-[24px]`}>
      <div className="pointer-events-none select-none">{props.value}</div>
    </section>
  );
}
