import React, { useEffect, useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { categories } from '../util/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {
	const [filter, setFilter] = useState('chicken');

	const [{ foodItems }, dispatch] = useStateValue();

	return (
		<section
			className='w-full my-6'
			id='menu'
		>
			<div className='w-full flex flex-col items-center justify-center'>
				<p className='text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto'>
					Our Hot Dishes
				</p>
				<div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
					{categories &&
						categories.map((category) => (
							<motion.div
								whileTap={{ scale: 0.6 }}
								key={category.id}
								className={`group ${
									filter === category.urlParamName ? 'bg-cartNumBg' : 'bg-card'
								}  w-24 h-28 min-w-[94px] cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
								onClick={() => setFilter(category.urlParamName)}
							>
								<div
									className={`w-10 h-10 rounded-full ${
										filter === category.urlParamName ? 'bg-card' : 'bg-cartNumBg'
									} group-hover:bg-white flex items-center justify-center`}
								>
									<IoFastFood
										className={`${
											filter === category.urlParamName ? 'text-textColor' : 'text-white'
										} group-hover:text-textColor text-lg`}
									/>
								</div>
								<p
									className={`${
										filter === category.urlParamName ? 'text-white' : 'text-textColor'
									} text-sm group-hover:text-white`}
								>
									{category.name}
								</p>
							</motion.div>
						))}
				</div>
				<div className='w-full'>
					<RowContainer
						flag={false}
						data={foodItems?.filter((item) => item.category === filter)}
					/>
				</div>
			</div>
		</section>
	);
};

export default MenuContainer;
