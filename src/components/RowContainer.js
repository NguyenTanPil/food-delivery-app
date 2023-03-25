import React, { forwardRef } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { motion } from 'framer-motion';
import NotFound from '../images/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const RowContainer = forwardRef(({ flag, data }, ref) => {
	const [{ cartItems }, dispatch] = useStateValue();

	const handleAddToCart = (item) => {
		const newItem = { ...item, initialQty: item.qty };
		const existItem = cartItems.find((cartItem) => cartItem.id === item.id);
		let newCartItems;

		if (existItem) {
			newCartItems = cartItems.map((cartItem) =>
				cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1, initialQty: cartItem.qty + 1 } : cartItem,
			);
		} else {
			newCartItems = [...cartItems, newItem];
		}

		dispatch({ type: actionTypes.SET_CART_ITEMS, cartItems: newCartItems });
		localStorage.setItem('cartItems', JSON.stringify(newCartItems));
	};

	return (
		<div
			ref={ref}
			className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
				flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
			}`}
		>
			{data && data.length > 0 ? (
				<>
					{data.map((item) => (
						<div
							key={item.id}
							className='min-w-[300px] md:min-w-[340px] md:w-340 w-300 h-auto backdrop-blur-lg bg-cardOverlay rounded-lg px-8 py-4 hover:drop-shadow-lg flex flex-col items-center justify-between'
						>
							<div className='w-full flex items-center justify-between'>
								<motion.img
									whileHover={{ scale: 1.2 }}
									src={item?.imageUrl}
									alt='item'
									className='w-40 h-40 object-contain  drop-shadow-2xl'
								/>
								<motion.div
									whileTap={{ scale: 0.75 }}
									className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
									onClick={() => handleAddToCart(item)}
								>
									<MdShoppingCart className='text-white' />
								</motion.div>
							</div>
							<div className='w-full flex flex-col gap-1 items-end justify-end'>
								<p className='text-textColor font-semibold text-base md:text-lg'>{item.title}</p>
								<p className='mt-1 text-sm text-gray-500'>{item?.calories} calories</p>
								<div className='flex items-center gap-8'>
									<p className='text-lg text-headingColor font-semibold'>
										<span className='text-sm text-red-500'>$</span> {item?.price}
									</p>
								</div>
							</div>
						</div>
					))}
				</>
			) : (
				<div className='w-full flex flex-col items-center justify-center'>
					<img
						src={NotFound}
						alt='Not Found'
						className='h-300'
					/>
					<p className='text-xl text-headingColor font-semibold mt-4'>Items Not Available</p>
				</div>
			)}
		</div>
	);
});

export default RowContainer;
