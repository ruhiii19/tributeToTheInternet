import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface ResponsiveColorSchemeProps {
  isExpanded: boolean;
}

const ResponsiveColorScheme: React.FC<ResponsiveColorSchemeProps> = ({
  isExpanded,
}) => {
  const [dimensions, setDimensions] = useState({
    outerWidth: 340,
    outerHeight: 340,
    innerWidth: 300,
    innerHeight: 300,
    blur: 240,
    opacity: 0.2,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // sm breakpoint
        setDimensions({
          outerWidth: 200,
          outerHeight: 200,
          innerWidth: 180,
          innerHeight: 180,
          blur: 120,
          opacity: 0.15,
        });
      } else if (width < 768) {
        // md breakpoint
        setDimensions({
          outerWidth: 280,
          outerHeight: 280,
          innerWidth: 250,
          innerHeight: 250,
          blur: 180,
          opacity: 0.18,
        });
      } else if (width < 1024) {
        // lg breakpoint
        setDimensions({
          outerWidth: 340,
          outerHeight: 340,
          innerWidth: 300,
          innerHeight: 300,
          blur: 240,
          opacity: 0.2,
        });
      } else {
        // xl and above
        setDimensions({
          outerWidth: 400,
          outerHeight: 400,
          innerWidth: 360,
          innerHeight: 360,
          blur: 280,
          opacity: 0.22,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const spring = useSpring({
    from: {
      transform: "scale(0.5)",
      opacity: 0,
    },
    to: {
      transform: isExpanded ? "scale(1)" : "scale(0.5)",
      opacity: isExpanded ? dimensions.opacity : 0,
    },
    config: {
      tension: 280,
      friction: 20,
    },
  });

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* Outer conical frame */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: dimensions.outerWidth,
          height: dimensions.outerHeight,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg at 50% 50%, #F4958E, #FFAAF7, #9193FC, #B4F6FE, #B0FFC0, #FEFF9D, #F3D9A0, #F4958E)",
          opacity: 0.1,
          filter: `blur(${dimensions.blur}px)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Inner expanding gradient layer */}
      <animated.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: dimensions.innerWidth,
          height: dimensions.innerHeight,
          transform: spring.transform.to(
            (scale) => `translate(-50%, -50%) ${scale}`
          ),
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg at 50% 50%, #F4958E, #FFAAF7, #9193FC, #B4F6FE, #B0FFC0, #FEFF9D, #F3D9A0, #F4958E)",
          opacity: spring.opacity,
          filter: `blur(${dimensions.blur}px)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default ResponsiveColorScheme;
