import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { MyAppText } from "@components/MyAppText";
import { Select } from "@components/Select";
import { ArrowLeft } from "phosphor-react-native";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

type MealInfo = {
  name: string;
  description: string;
  date: string;
  time: string;
  insideDiet?: boolean;
  [key: string]: string | boolean | undefined;
};

enum MealInfoErrors {
  name = "Nome",
  description = "Descrição",
  date = "Data",
  time = "Hora",
  insideDiet = "Se está dentro da dieta",
}

const validateTime = (time: string) => {
  const [hour, minute] = time.split(":");
  if (parseInt(hour) > 23 || parseInt(minute) > 59) return false;

  return true;
};

const validateDate = (date: string) => {
  const [day, month, year] = date.split("/");
  if (parseInt(day) > 31 || parseInt(month) > 12 || parseInt(year) > 9999)
    return false;

  return true;
};

export const NewMeal = () => {
  const navigation = useNavigation();

  const [mealInfo, setMealInfo] = useState<MealInfo>({
    name: "",
    description: "",
    date: "",
    time: "",
    insideDiet: undefined,
  });

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="black" />
        </BackButton>
        <MyAppText fontSize={18} fontStyle="bold">
          Nova refeição
        </MyAppText>
      </Header>
      <Content>
        <Input
          value={mealInfo.name}
          onChangeText={(text) => {
            setMealInfo((prevState) => ({
              ...prevState,
              name: text,
            }));
          }}
          label="Nome"
          keyboardType="default"
        />

        <Input
          value={mealInfo.description}
          onChangeText={(text) => {
            setMealInfo((prevState) => ({
              ...prevState,
              description: text,
            }));
          }}
          label="Descrição"
          keyboardType="default"
          numberOfLines={4}
          multiline
          textAlignVertical="top"
          style={{ maxHeight: 120 }}
        />

        <DateTimeContainer>
          <View style={{ flex: 1 }}>
            <Input
              value={mealInfo.date}
              onChangeText={(text) => {
                let numericText = text.replace(/[^0-9]/g, "");

                if (numericText.length > 2)
                  numericText =
                    numericText.slice(0, 2) + "/" + numericText.slice(2);

                if (numericText.length > 5)
                  numericText =
                    numericText.slice(0, 5) + "/" + numericText.slice(5);

                if (numericText.length > 10)
                  numericText = numericText.slice(0, 10);

                setMealInfo((prevState) => ({
                  ...prevState,
                  date: numericText,
                }));
              }}
              label="Data"
              keyboardType="number-pad"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              value={mealInfo.time}
              onChangeText={(text) => {
                let numericText = text.replace(/[^0-9]/g, "");

                if (numericText.length > 2) {
                  numericText =
                    numericText.slice(0, 2) + ":" + numericText.slice(2);
                }

                numericText = numericText.slice(0, 5);

                setMealInfo((prevState) => ({
                  ...prevState,
                  time: numericText,
                }));
              }}
              label="Hora"
              keyboardType="number-pad"
            />
          </View>
        </DateTimeContainer>

        <InsideDietContainer>
          <MyAppText fontSize={14} fontStyle="bold">
            Está dentro da dieta?
          </MyAppText>
          <Select
            selected={mealInfo.insideDiet}
            setSelected={(value) => {
              setMealInfo((prevState) => ({
                ...prevState,
                insideDiet: value,
              }));
            }}
          />
        </InsideDietContainer>

        <Button
          label="Cadastrar refeição"
          onPress={() => {
            let error = false;
            let errorMessage = "Os seguintes campos não foram preenchidos: ";

            Object.keys(mealInfo).forEach((key) => {
              console.log(typeof mealInfo[key], key, mealInfo[key]);
              if (
                mealInfo[key] === "" ||
                typeof mealInfo[key] === "undefined"
              ) {
                error = true;
                errorMessage += `${
                  MealInfoErrors[key as keyof typeof MealInfoErrors]
                }, `;
              }
            });

            if (error)
              return Alert.alert(
                "Campos inválidos",
                errorMessage.slice(0, errorMessage.length - 2)
              );

            if (mealInfo.date.length < 10)
              return Alert.alert(
                "Data inválida",
                "A data deve conter 10 caracteres"
              );

            if (mealInfo.time.length < 5)
              return Alert.alert("Hora inválida", "A hora está incompleta");

            if (!validateTime(mealInfo.time))
              return Alert.alert("Hora inválida", "A hora está inválida");

            if (!validateDate(mealInfo.date))
              return Alert.alert("Data inválida", "A data está inválida");

            console.log("submit", mealInfo);
          }}
        />
      </Content>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
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
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  flex-direction: column;

  padding: 40px 24px 24px;
  gap: 24px;
`;

const DateTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

const InsideDietContainer = styled.View`
  flex: 1;
  align-items: baseline;
  flex-direction: column;
  gap: 12px;
`;
