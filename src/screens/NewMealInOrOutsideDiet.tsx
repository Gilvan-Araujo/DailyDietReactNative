import { Button } from "@components/Button";
import { MyAppText } from "@components/MyAppText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import inDietImage from "@assets/in-diet.png";
import outsideDietImage from "@assets/outside-diet.png";

type RouteParams = ReactNavigation.RootParamList["newMealInsideOrOutsideDiet"];

export const NewMealInsideOrOutsideDiet = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { inDiet } = route.params as RouteParams;
  const inDietString = inDiet ? "inDiet" : "outsideDiet";

  const SubTextArrays = {
    inDiet: ["Você continua ", "dentro da dieta. ", "Muito bem!"],
    outsideDiet: [
      "Você ",
      "saiu da dieta ",
      "dessa vez, mas continue se esforçando e não desista!",
    ],
  };

  const handleGoHome = () => {
    navigation.navigate("home");
  };

  return (
    <Container>
      <MainText inDiet={inDiet}>
        {inDiet ? "Continue assim!" : "Que pena!"}
      </MainText>

      <SubTextContainer fontSize={16}>
        <MyAppText>{SubTextArrays[inDietString][0]}</MyAppText>
        <MyAppText fontStyle="bold">{SubTextArrays[inDietString][1]}</MyAppText>
        <MyAppText>{SubTextArrays[inDietString][2]} </MyAppText>
      </SubTextContainer>

      <ImageContainer
        source={inDiet ? inDietImage : outsideDietImage}
        // style={{ width: 200, height: 200 }}
      />

      <Button label="Ir para a página inicial" onPress={handleGoHome} />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 32px;
`;

const MainText = styled(MyAppText).attrs({
  fontSize: 24,
  fontStyle: "bold",
})<RouteParams>`
  color: ${({ theme, inDiet }) =>
    inDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
  font-size: 24px;
  margin-bottom: 10px;
`;

const SubTextContainer = styled(MyAppText)`
  text-align: center;
`;

const ImageContainer = styled.Image`
  margin-top: 40px;
  margin-bottom: 32px;
`;
