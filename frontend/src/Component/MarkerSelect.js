import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
export const MarkerSelectOpen = React.memo((props) => (
    <Svg
    width={48}
    height={56}
    viewBox="0 0 48 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M24 1.5A22.5 22.5 0 0146.5 24c0 9.168-7.026 19.186-21.8 30.267a1.167 1.167 0 01-1.4 0C8.526 43.187 1.5 33.168 1.5 24A22.5 22.5 0 0124 1.5z"
      fill="url(#paint0_linear_1304_10572)"
      stroke="#008515"
      strokeWidth={3}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1304_10572"
        x1={-5.2987}
        y1={-9.27273}
        x2={60.9427}
        y2={49.2074}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F9EEC8" />
        <Stop offset={0.63598} stopColor="#FFD029" />
        <Stop offset={1} stopColor="#D9AA04" />
      </LinearGradient>
    </Defs>
  </Svg>
))

