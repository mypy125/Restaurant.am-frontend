const categorizeIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const category = ingredient.category ? ingredient.category.name : "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {});
};

export default categorizeIngredients;

  