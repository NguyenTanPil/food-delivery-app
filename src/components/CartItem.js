import React, { useEffect, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const CartItem = ({ item }) => {
	const [quality, setQuality] = useState(item.qty);
	const [{ cartItems }, dispatch] = useStateValue();

	const handleUpdateCartItems = (newCartItems) => {
		dispatch({
			type: actionTypes.SET_CART_ITEMS,
			cartItems: newCartItems,
		});

		localStorage.setItem('cartItems', JSON.stringify(newCartItems));
	};

	const handleCrease = () => {
		setQuality(quality + 1);
		const newCartItems = cartItems.map((cartItem) =>
			cartItem.id === item.id ? { ...cartItem, qty: quality + 1 } : cartItem,
		);
		handleUpdateCartItems(newCartItems);
	};

	const handleDecrease = () => {
		let newCartItems;

		if (quality === 1) {
			newCartItems = cartItems.filter((item) => item.id !== item.id);
		} else {
			setQuality(quality - 1);
			newCartItems = cartItems.map((cartItem) =>
				cartItem.id === item.id ? { ...cartItem, qty: quality - 1 } : cartItem,
			);
		}

		handleUpdateCartItems(newCartItems);
	};

	useEffect(() => {
		setQuality(item.initialQty);
	}, [item.initialQty]);

	return (
		<div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
			<img
				src={item.imageUrl}
				alt={item.title}
				className='w-20 h-20 max-w-[60px] rounded-full object-contain'
			/>
			<div className='flex flex-col gap-2'>
				<p className='text-base text-gray-50'>{item.title}</p>
				<p className='text-sm block text-gray-300 font-semibold'>$ {Math.round(item.price * quality * 100) / 100}</p>
			</div>
			<div className='group flex items-center gap-2 ml-auto cursor-pointer'>
				<motion.div
					whileTap={{ scale: 0.75 }}
					onClick={handleDecrease}
				>
					<BiMinus className='text-gray-50' />
				</motion.div>
				<p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>{quality}</p>
				<motion.div
					whileTap={{ scale: 0.75 }}
					onClick={handleCrease}
				>
					<BiPlus className='text-gray-50' />
				</motion.div>
			</div>
		</div>
	);
};

export default CartItem;
