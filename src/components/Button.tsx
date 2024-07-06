import { TouchableOpacityProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { MyAppText } from "./MyAppText";
import { IconProps, PhosphorLogo } from "phosphor-react-native";

type StyleProps = {
  variant?: "DEFAULT" | "SECONDARY";
};

type ButtonProps = TouchableOpacityProps &
  StyleProps & {
    label: string;
    Icon: React.ComponentType<IconProps>;
  };

export const Button = ({ variant = "DEFAULT", Icon, ...rest }: ButtonProps) => {
  const theme = useTheme();

  return (
    <Container variant={variant} {...rest}>
      <Icon
        color={
          variant === "DEFAULT" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100
        }
        size={18}
      />
      <Title variant={variant} fontSize={14}>
        {rest.label}
      </Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity<StyleProps>`
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 12px;

  background-color: ${({ theme, variant }) =>
    variant === "DEFAULT" ? theme.COLORS.GRAY_200 : "transparent"};

  border-width: 1px;
  border-radius: 6px;
  border-color: ${({ theme, variant }) =>
    variant === "DEFAULT" ? theme.COLORS.GRAY_200 : theme.COLORS.GRAY_100};
`;

const Title = styled(MyAppText)<StyleProps>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  color: ${({ theme, variant }) =>
    variant === "DEFAULT" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100};
`;
