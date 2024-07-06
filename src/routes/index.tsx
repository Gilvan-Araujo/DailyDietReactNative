import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import styled from "styled-components/native";

export function Routes() {
  return (
    <AppContainer>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AppContainer>
  );
}

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;
