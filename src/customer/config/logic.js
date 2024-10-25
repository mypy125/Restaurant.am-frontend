export const isPresentInFavorites = (favorites, restaurant) => {
    return favorites.some(item => item.id === restaurant.id);
};
