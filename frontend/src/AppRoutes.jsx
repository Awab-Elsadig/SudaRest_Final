import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPage from './pages/Login/LoginPage'
import Restaurants from './pages/Restaurants/Restaurants'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/restaurants' element={<Restaurants />} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	)
}
