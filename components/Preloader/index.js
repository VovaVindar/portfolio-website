import MouseFollower from "@/components/MouseFollower";
import LoadingLines from "@/components/Preloader/LoadingLines";

const Preloader = ({
  numbersProgress,
  linesAnimation,
  className,
  onLoadingComplete,
}) => {
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
        <LoadingLines
          linesAnimation={linesAnimation}
          onAnimationComplete={onLoadingComplete}
        />
      </div>
    </>
  );
};

export default Preloader;
