import React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

type Props = SvgProps & {
  color?: string;
};

export const RoundCircle = ({ color, ...rest }: Props) => {
  return (
    <Svg width="9" height="8" viewBox="0 0 9 8" fill="none" {...rest}>
      <Circle cx="4.75" cy="3.99988" r="4" fill={color} />
    </Svg>
  );
};
