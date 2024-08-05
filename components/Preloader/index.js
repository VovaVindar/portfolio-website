import MouseFollower from "@/components/MouseFollower";
import LoadingLines from "@/components/Preloader/LoadingLines";

const Preloader = ({ numbersProgress, linesAnimation, className }) => {
  return (
    <>
      <div className={`preloader ${className}`}>
        <MouseFollower
          type="text"
          text={numbersProgress}
          className={`${className} white ${
            numbersProgress >= 100 ? "hidden" : ""
          }`}
        />
        <LoadingLines linesAnimation={linesAnimation} />
      </div>
    </>
  );
};

export default Preloader;
