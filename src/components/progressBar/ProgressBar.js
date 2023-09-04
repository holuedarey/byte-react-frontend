import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({
  size,
  value,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
  centerValue,
}) {
  const [offset, setOffset] = React.useState(0);
  const circleRef = React.useRef(null);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  React.useEffect(() => {
    const progressOffset = ((100 - value) / 100) * circumference;
    setOffset(progressOffset);

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, value, circumference, offset]);
  return (
    <div className="circular-progressbar">
      <svg className="circular-chart" width={size} height={size}>
        <circle
          className="circle-bg"
          stroke={circleOneStroke}
          strokeWidth={strokeWidth}
          cy={center}
          cx={center}
          r={radius}
        ></circle>
        <circle
          className="circle"
          ref={circleRef}
          stroke={circleTwoStroke}
          strokeWidth={strokeWidth}
          cy={center}
          cx={center}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset && offset}
          strokeLinecap="round"
        ></circle>
      </svg>
      <div className="center-content">
        <div>
          <p className="center-text">Total</p>
          <div className="center-value">{centerValue}</div>
        </div>
      </div>
    </div>
  );
}
