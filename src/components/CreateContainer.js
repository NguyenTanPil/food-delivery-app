import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { storage } from '../firebase.config';
import { categories } from '../util/data';
import { getAllFoodItems, saveItem } from '../util/firebaseFunctions';
import Loader from './Loader';

const CreateContainer = () => {
	const [title, setTitle] = useState('');
	const [calories, setCalories] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState(null);
	const [fields, setFields] = useState(false);
	const [alertStatus, setAlertStatus] = useState('danger');
	const [msg, setMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [imageAsset, setImageAsset] = useState(null);
	const [{ foodItems }, dispatch] = useStateValue();

	const handleUploadImage = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log({ uploadProgress });
			},
			(error) => {
				console.log({ error });
				setFields(true);
				setMsg('Error while uploading');
				setAlertStatus('danger');
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsset(downloadURL);
					setFields(true);
					setIsLoading(false);
					setMsg('Image uploaded successfully');
					setAlertStatus('success');
					setTimeout(() => {
						setFields(false);
					}, 4000);
				});
			},
		);
	};

	const handleDeleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg('Image deleted successfully');
			setAlertStatus('success');
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const handleClearData = () => {
		setTitle('');
		setImageAsset(null);
		setCalories('');
		setPrice('');
		setCategory('Select Category');
	};

	const fetchData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionTypes.SET_FOOD_ITEMS,
				foodItems: data,
			});
		});
	};

	const handleSaveDetails = () => {
		setIsLoading(true);

		try {
			if (!title || !category || !imageAsset || !price || !calories) {
				setFields(true);
				setMsg("Required fields can't empty");
				setAlertStatus('danger');
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			} else {
				const data = {
					id: `${Date.now()}`,
					title,
					imageUrl: imageAsset,
					category,
					calories,
					qty: 1,
					price,
				};
				saveItem(data);
				handleClearData();
				setIsLoading(false);
				setFields(true);
				setMsg('Item created successfully');
				setAlertStatus('success');
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.log({ error });
			setFields(true);
			setMsg('Error while uploading');
			setAlertStatus('danger');
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000);
		}

		fetchData();
	};

	return (
		<div className='w-full min-h-screen flex items-center justify-center '>
			<div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
				{fields && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`w-full p-2 rounded-lg text-center text-base font-semibold ${
							alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'
						}`}
					>
						{msg}
					</motion.p>
				)}

				<div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
					<MdFastfood className='text-xl text-gray-700' />
					<input
						type='text'
						required={true}
						name='title'
						id='title'
						value={title}
						placeholder='Give me a title...'
						className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='w-full '>
					<select
						name='category'
						id='category'
						className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
						onChange={(e) => setCategory(e.target.value)}
					>
						<option
							value='other'
							className='bg-white'
						>
							Select Category
						</option>
						{categories &&
							categories.map((category) => (
								<option
									key={category.id}
									value={category.urlParamName}
									className='text-base border-0 outline-none capitalize bg-white text-headingColor'
								>
									{category.name}
								</option>
							))}
					</select>
				</div>

				<div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg relative'>
					{isLoading ? (
						<Loader />
					) : (
						<>
							{!imageAsset ? (
								<>
									<label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
										<div className='w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2'>
											<MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
											<p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>
										</div>
										<input
											type='file'
											name='uploadImage'
											id='uploadImage'
											accept='image/*'
											className='w-0 h-0'
											onChange={handleUploadImage}
										/>
									</label>
								</>
							) : (
								<>
									<div className='h-full'>
										<img
											src={imageAsset}
											className='w-full h-full object-cover'
											alt='upload background'
										/>
										<button
											type='button'
											className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
											onClick={handleDeleteImage}
										>
											<MdDelete className='text-white ' />
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>

				<div className='w-full flex flex-col md:flex-row items-center gap-3'>
					<div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
						<MdFoodBank className='text-gray-700 text-2xl' />
						<input
							type='text'
							required
							value={calories}
							placeholder='Calories'
							className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 font-semibold text-textColor'
							onChange={(e) => setCalories(e.target.value)}
						/>
					</div>
					<div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
						<MdAttachMoney className='text-gray-700 text-2xl' />
						<input
							type='text'
							required
							value={price}
							placeholder='Price'
							className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 font-semibold text-textColor'
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
				</div>
				<div className='flex items-center w-full'>
					<button
						type='button'
						className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
						onClick={handleSaveDetails}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateContainer;
