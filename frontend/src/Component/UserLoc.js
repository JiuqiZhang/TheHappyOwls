import * as React from "react"
import Svg, { Circle } from "react-native-svg"

export default function UserLoc(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={10.5} cy={10.5} r={7.5} fill="#007AFF" />
      <Circle cx={10.5} cy={10.5} r={9} stroke="#fff" strokeWidth={3} />
    </Svg>
  )
}
