export const actionTypes = {
	SET_USER: 'SET_USER',
	SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
	SET_CART_SHOW: 'SET_CART_SHOW',
};

const reducer = (state, action) => {
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
		case actionTypes.SET_CART_SHOW: {
			return {
				...state,
				cartShow: action.cartShow,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
