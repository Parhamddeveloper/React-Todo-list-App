import "./CircularProgress.css";
const CircularProgress = ({ value }) => {
  const size = 60;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          className="fill-transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={`circular-progress-bar ${value == 100 && "stroke-green-500"} `}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span
        className={`font-bold absolute ${value == 100 && "text-green-500"}`}
      >
        {value}%
      </span>
    </div>
  );
};

export default CircularProgress;
