// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB105-vNTXC7oiab68bRnhwzSZiwANfuDM',
	authDomain: 'food-delivery-app-51f47.firebaseapp.com',
	databaseURL: 'https://food-delivery-app-51f47-default-rtdb.firebaseio.com',
	projectId: 'food-delivery-app-51f47',
	storageBucket: 'food-delivery-app-51f47.appspot.com',
	messagingSenderId: '866578549079',
	appId: '1:866578549079:web:85f22ac9726231b49fd612',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
