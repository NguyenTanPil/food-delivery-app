import { fetchCard, fetchUser } from '../util/fetchLocalStorage';

const userInfo = fetchUser();
const cardInfo = fetchCard();

export const initialState = {
	user: userInfo,
	foodItems: null,
	cartShow: false,
	cartItems: cardInfo,
};
