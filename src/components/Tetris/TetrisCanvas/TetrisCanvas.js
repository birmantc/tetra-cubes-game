import React from "react";

export default function TetrisCanvas(props) {
  const {width = 640, height = 600} = props;

  return <canvas id="canvas" width={width} height={height} />;
}
