import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const MarkerOpen = React.memo((props) => (
    <Svg
    width={30}
    height={35}
    viewBox="0 0 30 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 1a14 14 0 0114 14c0 5.698-4.369 11.943-13.6 18.867a.667.667 0 01-.8 0C5.368 26.943 1 20.698 1 15A14 14 0 0115 1z"
      fill="#F9EEC8"
      stroke="#008515"
      strokeWidth={2}
    />
  </Svg>
))
