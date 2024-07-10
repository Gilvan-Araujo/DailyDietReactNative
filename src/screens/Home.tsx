import { MyAppText } from "@components/MyAppText";
import { Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import uuid from "react-native-uuid";

import logo from "@assets/logo.png";
import profile from "@assets/profile.png";
import { ArrowDownRight, ArrowUpRight, Plus } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Button } from "@components/Button";
import { format } from "date-fns";
import { RoundCircle } from "@components/icons/RoundCircle";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMeals } from "@storage/meal/getMeals";
import { MealInfo } from "./NewMeal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CardProps = {
  type: "POSITIVE" | "NEGATIVE";
};

type Meal = {
  id: string;
  name: string;
  time: Date;
  inDiet: boolean;
};

export const Home = () => {
  const { COLORS } = useTheme();
  const { v4 } = uuid;
  const navigation = useNavigation();

  const [type, setType] = useState<"POSITIVE" | "NEGATIVE">("POSITIVE");
  const [meals, setMealsByDate] = useState<{ [key: string]: Meal[] }>({});

  const handleNewMeal = () => {
    navigation.navigate("newMeal");
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
  };

  const getMealsFromStorage = async () => {
    const meals: MealInfo[] = await getMeals();
    const mealsByDate: { [key: string]: Meal[] } = {};

    meals.forEach((meal: MealInfo) => {
      const date = meal.date;
      const time = new Date(`${date}T${meal.time}:00`);

      if (!mealsByDate[date]) {
        mealsByDate[date] = [];
      }

      mealsByDate[date].push({
        id: v4().toString(),
        name: meal.name,
        time,
        inDiet: meal.insideDiet ?? true,
      });
    });

    const sortedMealsByTime = Object.fromEntries(
      Object.entries(mealsByDate).map(([date, meals]) => [
        date,
        meals.sort((a, b) => b.time.getTime() - a.time.getTime()),
      ])
    );

    const sortedMealsByDate = Object.fromEntries(
      Object.entries(sortedMealsByTime).sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime()
      )
    );

    setMealsByDate(sortedMealsByDate);
  };

  useFocusEffect(
    useCallback(() => {
      getMealsFromStorage();
      clearStorage();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Image source={logo} />
        <TouchableOpacity onPress={clearStorage}>
          <MyAppText>Clear Storage</MyAppText>
        </TouchableOpacity>
        <Image source={profile} />
      </Header>

      <Card type={type} onPress={() => navigation.navigate("stats")}>
        {type === "POSITIVE" ? (
          <ArrowUpRight
            size={24}
            color={COLORS.GREEN_DARK}
            style={{ position: "absolute", top: 8, right: 8 }}
          />
        ) : (
          <ArrowDownRight
            size={24}
            color={COLORS.RED_DARK}
            style={{ position: "absolute", top: 8, right: 8 }}
          />
        )}

        <MyAppText fontSize={32} fontStyle="bold">
          90.86%
        </MyAppText>
        <MyAppText fontSize={14}>das refeições dentro da dieta</MyAppText>
      </Card>

      <Meals>
        <NewMeal>
          <MyAppText>Refeições</MyAppText>

          <Button Icon={Plus} label="Nova refeição" onPress={handleNewMeal} />
        </NewMeal>

        {Object.keys(meals).map((date) => {
          const mealsByDate = meals[date];
          const formattedDate = new Date(date + "T00:00");

          return (
            <DailyMealList key={date.toString()}>
              <MyAppText fontSize={18} fontStyle="bold">
                {format(formattedDate, "dd.MM.yyyy")}
              </MyAppText>

              {mealsByDate.map((meal) => (
                <Meal key={meal.id}>
                  <MyAppText>{format(meal.time, "HH:mm")}</MyAppText>

                  <Divider />

                  <MealNameAndStatusWrapper>
                    <MyAppText
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ flexShrink: 1 }}
                    >
                      {meal.name}
                    </MyAppText>

                    <RoundCircle
                      color={meal.inDiet ? COLORS.GREEN_MID : COLORS.RED_MID}
                    />
                  </MealNameAndStatusWrapper>
                </Meal>
              ))}
            </DailyMealList>
          );
        })}
      </Meals>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;

  padding: 24px;
`;

const Header = styled.View`
  width: 100%;
  margin-bottom: 24px;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Card = styled.TouchableOpacity<CardProps>`
  width: 100%;
  padding: 20px 16px;
  margin-bottom: 40px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme, type }) =>
    type === "POSITIVE" ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
  border-radius: 8px;
`;

const Meals = styled.View`
  flex-direction: column;
  width: 100%;
  gap: 40px;
`;

const NewMeal = styled.View`
  gap: 8px;
`;

const DailyMealList = styled.View`
  gap: 8px;
`;

const Meal = styled.View`
  align-items: center;
  border-width: 1px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_500};

  padding: 14px 16px 14px 12px;
  flex-direction: row;
  gap: 12px;
`;

const Divider = styled.View`
  height: 100%;
  width: 1px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

const MealNameAndStatusWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;
