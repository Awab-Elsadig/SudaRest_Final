import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Restaurants from './pages/Restaurants/Restaurants';
import Test from './pages/Test/Test';
import Profile from './pages/Profile/Profile';
import { AnimatePresence } from 'framer-motion';
import Cart from './pages/Cart/Cart';

export const AppRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.key}>
				<Route path='/' element={<Home />} />
				<Route path='/restaurants' element={<Restaurants />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/test' element={<Test />} />
			</Routes>
		</AnimatePresence>
	);
};
