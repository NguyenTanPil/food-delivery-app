import React, { useRef } from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
	const [{ foodItems, cartShow }, dispatch] = useStateValue();

	console.log({ foodItems });

	const rowContainerRef = useRef();

	const handleScroll = (scrollOffset) => {
		rowContainerRef.current.scrollLeft += scrollOffset;
	};

	return (
		<div className='w-full h-auto flex flex-col items-center justify-center overflow-x-hidden'>
			<HomeContainer />

			<section className='w-full my-6'>
				<div className='w-full flex items-center justify-between'>
					<p className='text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
						Our fresh & healthy fruits
					</p>
					<div className='hidden md:flex items-center gap-3'>
						<motion.div
							whileTap={{ scale: 0.75 }}
							className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer  hover:shadow-lg'
						>
							<MdChevronLeft
								className='text-lg text-white'
								onClick={() => handleScroll(-200)}
							/>
						</motion.div>
						<motion.div
							whileTap={{ scale: 0.75 }}
							className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'
						>
							<MdChevronRight
								className='text-lg text-white'
								onClick={() => handleScroll(200)}
							/>
						</motion.div>
					</div>
				</div>

				<RowContainer
					ref={rowContainerRef}
					flag={true}
					data={foodItems}
				/>
			</section>
			<section className='w-full my-6'>
				<MenuContainer />
				{cartShow && <CartContainer />}
			</section>
		</div>
	);
};

export default MainContainer;
