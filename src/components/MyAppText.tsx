import { TextProps } from "react-native";
import styled from "styled-components/native";

type MyAppTextProps = TextProps & {
  fontSize?: number;
  fontStyle?: "regular" | "bold";
};

export const MyAppText = ({
  children,
  fontSize = 16,
  fontStyle = "regular",
  ...rest
}: MyAppTextProps) => {
  return (
    <CustomText {...rest} fontSize={fontSize} fontStyle={fontStyle}>
      {children}
    </CustomText>
  );
};

const CustomText = styled.Text<MyAppTextProps>`
  font-family: ${({ theme, fontStyle }) =>
    fontStyle === "regular"
      ? theme.FONT_FAMILY.REGULAR
      : theme.FONT_FAMILY.BOLD};
  line-height: ${({ fontSize }) => (fontSize ? fontSize * 1.3 : 16 * 1.3)}px;
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
