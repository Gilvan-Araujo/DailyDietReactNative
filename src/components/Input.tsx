import { TextInput, TextInputProps } from "react-native";
import styled, { css, useTheme } from "styled-components/native";
import { MyAppText } from "./MyAppText";
import { useState } from "react";
import TextInputMask from "react-native-text-input-mask";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
  label?: string;
  mask?: string;
};

export function Input({ inputRef, label, ...rest }: Props) {
  const { COLORS } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const test = new Object(rest.style);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}

      <InputWrapper
        {...rest}
        ref={inputRef}
        placeholderTextColor={COLORS.GRAY_500}
        style={{
          ...test,
          borderColor:
            isFocused || rest.value ? COLORS.GRAY_100 : COLORS.GRAY_500,
        }}
        onFocus={(e) => {
          rest.onFocus && rest.onFocus(e);
          onFocus();
        }}
        onBlur={(e) => {
          rest.onBlur && rest.onBlur(e);
          onBlur();
        }}
      />
    </Container>
  );
}

const Container = styled.View``;

const InputWrapper = styled(TextInput)<Props>`
  min-height: 56px;

  ${({ theme, value, inputRef }) => css`
    background-color: ${theme.COLORS.WHITE};
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE[16]}px;
    border-color: ${value ? theme.COLORS.GRAY_100 : theme.COLORS.GRAY_500};
  `}

  border-radius: 6px;
  border-width: 1px;
  padding: 14px;
  width: 100%;
`;

const Label = styled(MyAppText).attrs({ fontStyle: "bold", fontSize: 14 })`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  margin-bottom: 4px;
`;
