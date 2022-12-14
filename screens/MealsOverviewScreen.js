import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { CATEGORIES, MEALS } from "../data/dummy-data";

import MealItem from "../components/MealItem";

function MealsOverviewScreen(props) {
  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter((item) => {
    return item.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const catTitle = CATEGORIES.find((category) => category.id === catId).title;

    props.navigation.setOptions({ title: catTitle });
  }, [catId, props.navigation]);

  function renderMealItem(itemData) {
    const item = itemData.item;
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View styles={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
