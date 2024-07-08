import styled, { css, useTheme } from "styled-components/native";
import { MyAppText } from "./MyAppText";

import { RoundCircle } from "./icons/RoundCircle";
import { useState } from "react";

type StyleProps = {
  selected?: boolean;
};

type SelectProps = StyleProps & {
  setSelected: (selected: boolean) => void;
};

export const Select = ({ selected, setSelected }: SelectProps) => {
  const theme = useTheme();

  return (
    <Container>
      <YesButton selected={selected} onPress={() => setSelected(true)}>
        <RoundCircle color={theme.COLORS.GREEN_DARK} />
        <MyAppText fontSize={14}>Sim</MyAppText>
      </YesButton>

      <NoButton
        selected={selected === false}
        onPress={() => setSelected(false)}
      >
        <RoundCircle color={theme.COLORS.RED_DARK} />
        <MyAppText fontSize={14}>Não</MyAppText>
      </NoButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-height: 50px;
  min-height: 50px;
  gap: 12px;
  width: 100%;
`;

const BaseButton = styled.TouchableOpacity<StyleProps>`
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-color: ${({ theme }) => theme.COLORS.GRAY_600};

  border-width: 1px;
  border-radius: 6px;

  min-height: 50px;
  max-height: 50px;
`;

const YesButton = styled(BaseButton)<StyleProps>`
  ${({ theme, selected }) => css`
    background-color: ${selected
      ? theme.COLORS.GREEN_LIGHT
      : theme.COLORS.GRAY_600};
    border-color: ${selected ? theme.COLORS.GREEN_DARK : theme.COLORS.GRAY_600};
  `};
`;

const NoButton = styled(BaseButton)<StyleProps>`
  ${({ theme, selected }) => css`
    background-color: ${selected
      ? theme.COLORS.RED_LIGHT
      : theme.COLORS.GRAY_600};
    border-color: ${selected ? theme.COLORS.RED_DARK : theme.COLORS.GRAY_600};
  `};
`;
