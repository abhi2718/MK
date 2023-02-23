import React, { useRef } from "react";
import Sketch from "react-p5";
let startX = null;
let startY = null;
let endX = null;
let endY = null;
let image;
let isImageLoaded = false;
const strokeWidth = 2;
const imageurl =
  "https://res.cloudinary.com/dsn8xcpsw/image/upload/v1671945326/mk_whh9ru.png";
export const SketchComponent = (props) => {
  const vectorRef = useRef();
  const p5Ref = useRef();
  const canvasRef = useRef();

  const setup = (p5, canvasParentRef) => {
    p5Ref.current = p5;
    image = p5.loadImage(imageurl);
    p5.cursor(p5.CROSS);
    vectorRef.current = p5.createVector();
    canvasRef.current = p5.createCanvas(1000, 1000).parent(canvasParentRef);
  };
  const customLine = (x, y, x1, y1, p5) => {
    vectorRef.current.x = x1 - x;
    vectorRef.current.y = y1 - y;
    for (let i = 0; i < vectorRef.current.mag(); i++) {
      p5.fill(0).circle(
        x + i * p5.cos(vectorRef.current.heading()),
        y + i * p5.sin(vectorRef.current.heading()),
        strokeWidth
      );
    }
  };
  const draw = (p5) => {
    if (!isImageLoaded) {
      p5.background(image);
      isImageLoaded = true;
    }
    if (startX && startY) {
      p5.point(startX, startY);
      p5.stroke("black");
      p5.strokeWeight(5);
    }
  };
  const mouseDragged = (p5) => {
    endX = p5.mouseX;
    endY = p5.mouseY;
  };
  const mousePressed = (p5) => {
    startX = p5.mouseX;
    startY = p5.mouseY;
  };

  const mouseReleased = (p5) => {
    endX = p5.mouseX;
    endY = p5.mouseY;
    if (startX && startY) {
      customLine(startX, startY, p5.mouseX, p5.mouseY, p5);
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseDragged={mouseDragged}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
    />
  );
};
