import styled from "styled-components/native";

import { Button } from "@components/Button";
import { PencilSimpleLine, Trash } from "phosphor-react-native";
import { MyAppText } from "@components/MyAppText";
import { Select } from "@components/Select";
import { useState } from "react";
import { Input } from "@components/Input";

export const Components = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Container>
      <MyAppText fontSize={24}>Components</MyAppText>

      <MyAppText fontSize={18}>Buttons</MyAppText>
      <ButtonsContainer>
        <Button variant="DEFAULT" label="Label" Icon={PencilSimpleLine} />
        <Button variant="SECONDARY" label="Label" Icon={Trash} />
      </ButtonsContainer>

      <MyAppText fontSize={18}>Select</MyAppText>
      <Select selected={selected} setSelected={setSelected} />

      <MyAppText fontSize={18}>Input</MyAppText>
      <Input placeholder="Example" label="Label" />
      <Input placeholder="Example" value="Filled" />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;

  padding: 72px 32px;
  gap: 24px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;

const SelectContainer = styled.View`
  flex-direction: column;
  gap: 16px;
`;
