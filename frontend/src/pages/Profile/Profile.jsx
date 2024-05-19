import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './Profile.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';

const containerVariants = {
	initial: {
		x: '-100dvw',
	},
	final: {
		x: 0,
		transition: { type: 'tween' },
	},
	exit: {
		x: '100dvw',
		transition: { type: 'tween' },
	},
};

export default function Profile() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const { user, login } = useAuth();
	const [params] = useSearchParams();
	const [loginOrRegister, setLoginOrRegister] = useState('login');
	const returnUrl = params.get('returnUrl');

	useEffect(() => {
		if (!user) return;
		returnUrl ? navigate(returnUrl) : navigate('/');
	}, [navigate, returnUrl, user]);

	const submit = async ({ email, password }) => {
		console.log(email, password);
		await login(email, password);
	};

	return (
		<motion.div
			className={classes.container}
			variants={containerVariants}
			initial='initial'
			animate='final'
			exit='exit'
		>
			<h2>{loginOrRegister == 'login' ? 'Login' : 'Register'}</h2>
			<form onSubmit={handleSubmit(submit)} noValidate>
				{loginOrRegister == 'register' && (
					<Input
						type='username'
						label='Username'
						{...register('username', {
							required: true,
						})}
						error={errors.email}
					/>
				)}
				<Input
					type='email'
					label='Email'
					{...register('email', {
						required: true,
						pattern: {
							value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
							message: 'Email is Not Valid',
						},
					})}
					error={errors.email}
				/>
				<Input
					type='password'
					label='Password'
					{...register('password', {
						required: true,
					})}
					error={errors.password}
				/>

				<Button
					type='submit'
					text={loginOrRegister == 'login' ? 'Login' : 'Register'}
					width='100%'
					margin={'1rem 0 0 0'}
					backgroundColor='dodgerblue'
					fontWeight={'600'}
				/>
				<span className={classes.under}>
					{loginOrRegister == 'login' ? (
						<>
							<p>ما عندك حساب؟</p>
							<p
								onClick={() => setLoginOrRegister('register')}
								className={classes.loginOrRegister}
							>
								حساب جديد
							</p>
						</>
					) : (
						<>
							<p>عندك حساب؟</p>
							<p
								onClick={() => setLoginOrRegister('login')}
								className={classes.loginOrRegister}
							>
								تسجيل دخول
							</p>
						</>
					)}
				</span>
			</form>
		</motion.div>
	);
}
