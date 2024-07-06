import { TextProps } from "react-native";
import styled from "styled-components/native";

type MyAppTextProps = TextProps & {
  fontSize?: number;
};

export const MyAppText = ({
  children,
  fontSize = 16,
  ...rest
}: MyAppTextProps) => {
  return (
    <CustomText {...rest} fontSize={fontSize}>
      {children}
    </CustomText>
  );
};

const CustomText = styled.Text<MyAppTextProps>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  line-height: ${({ fontSize }) => (fontSize ? fontSize * 1.3 : 16 * 1.3)}px;
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
