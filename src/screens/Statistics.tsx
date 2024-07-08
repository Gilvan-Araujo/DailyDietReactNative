import { MyAppText } from "@components/MyAppText";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

type CardTypeProps = {
  type: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
};

export const Statistics = () => {
  const navigation = useNavigation();
  const { COLORS } = useTheme();

  const renderTitleAndContent = (title: string, content: string) => (
    <>
      <MyAppText fontSize={24} fontStyle="bold">
        {title}
      </MyAppText>
      <MyAppText fontSize={14}>{content}</MyAppText>
    </>
  );

  return (
    <Container>
      <Header>
        <MyAppText fontSize={32} fontStyle="bold">
          90,86%
        </MyAppText>
        <MyAppText>das refeições dentro da dieta</MyAppText>
      </Header>

      <BackButton onPress={() => navigation.goBack()}>
        <ArrowLeft size={32} color={COLORS.GREEN_DARK} />
      </BackButton>

      <MainContent>
        <MyAppText fontSize={16} fontStyle="bold">
          Estatísticas gerais
        </MyAppText>

        <Card type="NEUTRAL">
          {renderTitleAndContent(
            "22",
            "melhor sequência de pratos dentro da dieta"
          )}
        </Card>

        <Card type="NEUTRAL">
          {renderTitleAndContent("109", "refeições registradas")}
        </Card>

        <PositiveAndNegativeCardsContainer>
          <Card type="POSITIVE">
            {renderTitleAndContent("99", "refeições dentro da dieta")}
          </Card>

          <Card type="NEGATIVE">
            {renderTitleAndContent("10", "refeições fora da dieta")}
          </Card>
        </PositiveAndNegativeCardsContainer>
      </MainContent>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  padding-top: 48px;
  background-color: ${({ theme }) => theme.COLORS.GREEN_LIGHT};
  align-items: center;
  height: 100%;
`;

const Header = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 56px;
  left: 24px;
`;

const MainContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 100%;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  gap: 24px;
  padding: 24px;
`;

const Card = styled.View<CardTypeProps>`
  padding: 16px;

  border-radius: 8px;
  gap: 8px;

  align-items: center;

  background-color: ${({ theme, type }) => {
    switch (type) {
      case "POSITIVE":
        return theme.COLORS.GREEN_LIGHT;
      case "NEGATIVE":
        return theme.COLORS.RED_LIGHT;
      case "NEUTRAL":
        return theme.COLORS.GRAY_600;
    }
  }};

  width: ${({ type }) => {
    switch (type) {
      case "POSITIVE":
        return "50%";
      case "NEGATIVE":
        return "50%";
      case "NEUTRAL":
        return "100%";
    }
  }};
`;

const PositiveAndNegativeCardsContainer = styled.View`
  flex-direction: row;
  max-width: 100%;
  gap: 12px;
  justify-content: center;
`;
