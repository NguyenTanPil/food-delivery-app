import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './components';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './util/firebaseFunctions';
import { actionTypes } from './context/reducer';

const App = () => {
	const [{ foodItems }, dispatch] = useStateValue();

	useEffect(() => {
		const fetchData = async () => {
			await getAllFoodItems().then((data) => {
				dispatch({
					type: actionTypes.SET_FOOD_ITEMS,
					foodItems: data,
				});
			});
		};

		fetchData();
	}, []);

	return (
		<AnimatePresence mode='wait'>
			<div className='w-full h-auto flex-col bg-primary'>
				<Header />
				<main className='mt-16 md:mt-20 px-8 md:px-16 py-4 w-full'>
					<Routes>
						<Route
							path='/*'
							element={<MainContainer />}
						/>
						<Route
							path='/create-item'
							element={<CreateContainer />}
						/>
					</Routes>
				</main>
			</div>
		</AnimatePresence>
	);
};

export default App;
