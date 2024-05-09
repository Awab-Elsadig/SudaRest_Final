// App.js
import React from 'react';
import { AppRoutes } from './AppRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<>
			<Header />
			<AppRoutes />
			<Footer />
		</>
	);
}

export default App;
