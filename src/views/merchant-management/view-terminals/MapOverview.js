import React from "react";
import "./MapOverview.css";
import GoogleMapFunc from "../../../components/GoogleMapFunc";

export default function MapOverview({ summary }) {
  return (
    <div>
      <div className="map-overview">
        <div className="summary">{summary}</div>
        <div className="map-container">
          <GoogleMapFunc />
        </div>
      </div>
    </div>
  );
}
