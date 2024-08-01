const Preloader = ({ progress, exitAnimation, barComplete, className }) => {
  return (
    <div
      className={`preloader ${exitAnimation ? "complete" : ""}  ${className}`}
      style={{ "--progress-width": `${progress}%` }}
    >
      <div
        className="timeline"
        style={{
          position: "absolute",
          top: "12rlh",
        }}
      >
        <span className="text-header-3">From 2019</span>
        <div className={`${barComplete ? "complete" : ""}`}></div>
        <span className="text-header-3">To Present</span>
      </div>
      <p className="text-header-3">{progress}</p>
    </div>
  );
};

export default Preloader;
