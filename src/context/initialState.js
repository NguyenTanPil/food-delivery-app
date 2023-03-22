import { fetchUser } from '../util/fetchLocalStorage';

const userInfo = fetchUser();

export const initialState = {
	user: userInfo,
	foodItems: null,
	cartShow: false,
};
