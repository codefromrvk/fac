import React, { ReactHTMLElement, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const ScrollableContainer = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect scroll position and update model position
  useFrame(() => {
    const scrollY = containerRef?.current.scrollTop;
    // Calculate the model's new position based on the scrollY value
    // For example, adjust the Y position based on scrollY:
    // model.position.y = scrollY * 0.1;
  });

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
    >
      <Canvas>{children}</Canvas>
    </div>
  );
};

export default ScrollableContainer;
