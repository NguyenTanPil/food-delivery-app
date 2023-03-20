export const actionTypes = {
	SET_USER: 'SET_USER',
	SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
};

const reducer = (state, action) => {
	console.log({ action: action });

	switch (action.type) {
		case actionTypes.SET_USER: {
			return {
				...state,
				user: action.user,
			};
		}
		case actionTypes.SET_FOOD_ITEMS: {
			return {
				...state,
				foodItems: action.foodItems,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
