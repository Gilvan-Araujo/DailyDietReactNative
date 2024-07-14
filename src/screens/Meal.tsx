import { MyAppText } from "@components/MyAppText";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getMealById } from "@storage/meals/getMealById";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import { MealInfo } from "./NewMeal";
import {
  ArrowLeft,
  Circle,
  PencilSimpleLine,
  Trash,
} from "phosphor-react-native";
import { format } from "date-fns";
import { Alert, Modal, View } from "react-native";
import { Button } from "@components/Button";
import { deleteMeal } from "@storage/meals/deleteMeal";

type RouteParams = ReactNavigation.RootParamList["meal"];

type ContainerProps = {
  insideDiet: boolean;
};

export const Meal = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { COLORS } = useTheme();

  const { mealId } = route.params as RouteParams;

  const [meal, setMeal] = useState<MealInfo>({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    insideDiet: undefined,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleGoHome = () => navigation.navigate("home");

  const getMeal = async () => {
    try {
      const meal = await getMealById(mealId);

      if (meal) setMeal(meal);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Refeição não encontrada", [
        {
          text: "Página inicial",
          onPress: handleGoHome,
        },
      ]);
    }
  };

  const handleDeleteMeal = async () => {
    Alert.alert("Atenção", "Deseja realmente excluir essa refeição?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: async () => {
          await deleteMeal(mealId);
          navigation.navigate("home");
        },
      },
    ]);
  };

  const handleNavigateEditMeal = () => {
    navigation.navigate("editMeal", { mealId });
  };

  useFocusEffect(
    useCallback(() => {
      getMeal();
    }, [])
  );

  return (
    <Container insideDiet={meal?.insideDiet ?? true}>
      <Header>
        <BackButton onPress={handleGoHome}>
          <ArrowLeft size={24} color="black" />
        </BackButton>
        <MyAppText fontSize={18} fontStyle="bold">
          Refeição
        </MyAppText>
      </Header>

      <Content>
        <View style={{ gap: 24 }}>
          <DetailsSubsection>
            <MyAppText fontSize={20} fontStyle="bold">
              {meal?.name}{" "}
            </MyAppText>
            <MyAppText fontSize={16}>{meal?.description}</MyAppText>
          </DetailsSubsection>

          {meal?.date && meal?.time && (
            <DetailsSubsection>
              <MyAppText fontSize={14} fontStyle="bold">
                Data e hora
              </MyAppText>
              <MyAppText fontSize={16}>
                {format(new Date(meal.date + "T00:00"), "dd/MM/yyyy")} às{" "}
                {meal.time}
              </MyAppText>
            </DetailsSubsection>
          )}

          <Tag>
            <Circle
              weight="fill"
              size={8}
              color={meal?.insideDiet ? COLORS.GREEN_DARK : COLORS.RED_DARK}
            />

            <MyAppText fontSize={14}>
              {meal?.insideDiet ? "dentro da dieta" : "fora da dieta"}
            </MyAppText>
          </Tag>
        </View>

        <ButtonsContainer>
          <Button
            label="Editar refeição"
            Icon={PencilSimpleLine}
            onPress={handleNavigateEditMeal}
          />
          <Button
            label="Excluir refeição"
            variant="SECONDARY"
            Icon={Trash}
            onPress={handleDeleteMeal}
          />
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

const Container = styled(SafeAreaView)<ContainerProps>`
  flex: 1;
  background-color: ${({ theme, insideDiet }) =>
    insideDiet ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
`;

const Header = styled.View`
  width: 100%;
  padding: 24px;

  justify-content: center;
  flex-direction: row;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 24px;
  left: 24px;
`;

const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex-direction: column;

  justify-content: space-between;
  padding: 40px 24px 24px;
  gap: 24px;
`;

const DetailsSubsection = styled.View`
  flex-direction: column;
  gap: 8px;
`;

const Tag = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 8px 16px;
  border-radius: 1000px;
  max-width: fit-content;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ButtonsContainer = styled.View`
  flex-direction: column;
  gap: 8px;
`;
