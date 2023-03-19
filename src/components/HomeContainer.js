import React from 'react';
import Delivery from '../images/delivery.png';
import HeroBg from '../images/heroBg.png';
import { heroData } from '../util/data';

const HomeContainer = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-[calc(100vh-88px)]'>
			<div className='flex py-2 flex-1 flex-col items-start justify-center gap-6'>
				<div className='flex items-center gap-2 justify-center bg-orange-200 px-4 rounded-full py-1 w-fit'>
					<p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
					<div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
						<img
							src={Delivery}
							className='w-full h-full object-contain'
							alt='delivery'
						/>
					</div>
				</div>
				<p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
					The Fastest Delivery in <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span>
				</p>
				<p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio quia similique nihil alias mollitia. Voluptate
					quam provident ullam aliquam reprehenderit eos sequi laborum dignissimos obcaecati consequuntur, nobis vitae,
					illo tempora.
				</p>
				<button
					type='button'
					className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white font-bold '
				>
					Order Now
				</button>
			</div>
			<div className='py-2 flex-1 flex items-center relative'>
				<img
					src={HeroBg}
					className='ml-auto w-full lg:w-auto h-420 lg:h-650'
					alt='hero-bg'
				/>
				<div className='w-full absolute top-12 md:top-[50%] md:translate-y-[-50%] left-0 flex items-center justify-center py-4 gap-x-4 gap-y-8 lg:gap-y-16 flex-wrap lg:px-32'>
					{heroData &&
						heroData.map(({ id, name, desc, imgSrc, price }) => (
							<div
								key={id}
								className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-lg flex items-center justify-center flex-col drop-shadow-md h-fit'
							>
								<img
									src={imgSrc}
									className='w-20 lg:w-40 -mt-10 lg:-mt-20'
									alt={name}
								/>
								<p className='font-semibold text-textColor text-base lg:text-xl mt-2 lg:mt-4'>{name}</p>
								<p className='text-[12px] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-2'>{desc}</p>
								<p className='text-sm font-semibold text-headingColor'>
									<span className='text-xs text-red-500'>$</span>
									{price}
								</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default HomeContainer;
