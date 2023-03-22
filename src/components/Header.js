import React, { useState } from 'react';
import Logo from '../images/logo.png';
import Avatar from '../images/avatar.png';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const Header = () => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const [{ user, cartShow }, dispatch] = useStateValue();
	const [isShowMenu, setShowMenu] = useState(false);

	const handleLogin = async () => {
		if (!user) {
			const {
				user: { providerData },
			} = await signInWithPopup(firebaseAuth, provider);

			const userInfo = providerData[0];
			dispatch({
				type: actionTypes.SET_USER,
				user: userInfo,
			});
			localStorage.setItem('user', JSON.stringify(userInfo));
		} else {
			setShowMenu(!isShowMenu);
		}
	};

	const handleLogout = () => {
		setShowMenu(false);
		localStorage.removeItem('user');
		dispatch({ type: actionTypes.SET_USER, user: null });
	};

	const handleShowCart = () => {
		dispatch({ type: actionTypes.SET_CART_SHOW, cartShow: !cartShow });
	};

	return (
		<header className='fixed z-50 top-0 w-screen p-3 px-8 md:p-6 md:px-16 bg-white'>
			{/* desktop and tablet */}
			<div className='hidden md:flex w-full h-full items-center justify-between'>
				<Link
					to='/'
					className='flex items-center gap-2'
				>
					<img
						src={Logo}
						className='w-8 object-cover'
						alt='logo'
					/>
					<p className='text-headerColor text-xl font-bold'>City</p>
				</Link>
				<div className='flex items-center gap-8'>
					<motion.ul
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 200 }}
						className='flex items-center gap-8'
					>
						<li className='text-base text-headingColor cursor-pointer duration-100 transition-all ease-in-out'>Home</li>
						<li className='text-base text-headingColor cursor-pointer duration-100 transition-all ease-in-out'>Menu</li>
						<li className='text-base text-headingColor cursor-pointer duration-100 transition-all ease-in-out'>
							About Us
						</li>
						<li className='text-base text-headingColor cursor-pointer duration-100 transition-all ease-in-out'>
							Service
						</li>
					</motion.ul>
					<div
						className='relative flex items-center justify-center'
						onClick={handleShowCart}
					>
						<MdShoppingBasket className='text-textColor text-2xl  cursor-pointer' />
						<div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
							<p className='text-xs text-white font-semibold'>2</p>
						</div>
					</div>

					<div className='relative'>
						<motion.img
							whileTap={{ scale: 0.6 }}
							src={user ? user.photoURL : Avatar}
							className='w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
							alt='user profile'
							onClick={handleLogin}
						/>
						{isShowMenu && (
							<motion.div
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.6 }}
								className='w-32 bg-primary shadow-xl rounded-lg flex flex-col absolute py-2 top-12 right-0'
							>
								{user && (
									<Link to='/create-item'>
										<p
											className='cursor-pointer py-1 px-4 flex items-center hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'
											onClick={() => setShowMenu(false)}
										>
											<MdAdd className='mr-1' /> New Item
										</p>
									</Link>
								)}
								<p
									className='cursor-pointer py-1 px-4 flex items-center hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'
									onClick={handleLogout}
								>
									<MdLogout className='mr-1' />
									Logout
								</p>
							</motion.div>
						)}
					</div>
				</div>
			</div>
			{/* mobile */}
			<div className='flex items-center justify-between md:hidden w-full h-full'>
				<div className='relative flex items-center justify-center'>
					<MdShoppingBasket className='text-textColor text-2xl  cursor-pointer' />
					<div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
						<p className='text-xs text-white font-semibold'>2</p>
					</div>
				</div>
				<Link
					to='/'
					className='flex items-center gap-2'
				>
					<img
						src={Logo}
						className='w-8 object-cover'
						alt='logo'
					/>
					<p className='text-headingColor text-xl font-bold'>City</p>
				</Link>
				<div className='relative'>
					<motion.img
						whileTap={{ scale: 0.6 }}
						src={user ? user.photoURL : Avatar}
						className='w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
						alt='user profile'
						onClick={handleLogin}
					/>
					{isShowMenu && (
						<motion.div
							initial={{ opacity: 0, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.6 }}
							className='w-32 bg-primary shadow-xl rounded-lg flex flex-col absolute py-2 top-12 right-0'
						>
							{user && (
								<Link to='/create-item'>
									<p
										className='cursor-pointer py-1 px-4 flex items-center hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'
										onClick={() => setShowMenu(false)}
									>
										New Item
										<MdAdd className='ml-1' />
									</p>
								</Link>
							)}
							<ul
								initial={{ opacity: 0, x: 200 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 200 }}
								className='flex items-center flex-col'
							>
								<li
									className='text-base hover:bg-slate-200 text-headingColor cursor-pointer duration-100 transition-all ease-in-out w-full py-1 pr-4 pl-4'
									onClick={() => setShowMenu(false)}
								>
									Home
								</li>
								<li
									className='text-base hover:bg-slate-200 text-headingColor cursor-pointer duration-100 transition-all ease-in-out w-full py-1 pr-4 pl-4'
									onClick={() => setShowMenu(false)}
								>
									Menu
								</li>
								<li
									className='text-base hover:bg-slate-200 text-headingColor cursor-pointer duration-100 transition-all ease-in-out w-full py-1 pr-4 pl-4'
									onClick={() => setShowMenu(false)}
								>
									About Us
								</li>
								<li
									className='text-base hover:bg-slate-200 text-headingColor cursor-pointer duration-100 transition-all ease-in-out w-full py-1 pr-4 pl-4'
									onClick={() => setShowMenu(false)}
								>
									Service
								</li>
							</ul>
							<p
								className='cursor-pointer py-2 px-4 flex items-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base rounded-md justify-center mx-2 mt-1 shadow-md'
								onClick={handleLogout}
							>
								Logout
								<MdLogout className='ml-1' />
							</p>
						</motion.div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
