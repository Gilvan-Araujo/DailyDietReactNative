import React from "react";
import Svg, { Circle } from "react-native-svg";

type Props = {
  color?: string;
};

export const RoundCircle = ({ color }: Props) => {
  return (
    <Svg width="9" height="8" viewBox="0 0 9 8" fill="none">
      <Circle cx="4.75" cy="3.99988" r="4" fill={color} />
    </Svg>
  );
};
