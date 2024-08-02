import MouseFollower from "@/components/MouseFollower";
import LoadingLines from "@/components/Preloader/LoadingLines";

const Preloader = ({ followerProgress, linesAnimation, className }) => {
  return (
    <>
      <div
        className={`preloader ${linesAnimation ? "complete" : ""} ${className}`}
      >
        <MouseFollower
          type="text"
          text={followerProgress}
          className={`${className} ${followerProgress >= 100 ? "hidden" : ""}`}
        />
        <LoadingLines linesAnimation={linesAnimation} />
      </div>
    </>
  );
};

export default Preloader;
