export const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc, ingredient) => {
        
        const categoryName = ingredient.category?.name || "Без категории"; 

        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }

        acc[categoryName].push(ingredient);
        return acc;
    }, {});
};

export default categorizeIngredients;