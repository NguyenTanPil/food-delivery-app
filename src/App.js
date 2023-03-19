import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './components';
import { AnimatePresence } from 'framer-motion';

const App = () => {
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
