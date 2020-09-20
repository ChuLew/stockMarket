import "./VideoItem.css";
import React from "react";

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div onClick={() => onVideoSelect(video)} className="video-item item">
      {" "}
      {/* if we want to invoke function with argument we need to do the esx syntax */}
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.tite}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
