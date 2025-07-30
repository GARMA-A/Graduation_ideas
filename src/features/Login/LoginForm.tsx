import {
	Box,
	TextField,
	Button,
	Typography,
	Checkbox,
	FormControlLabel,
	Divider,
	InputAdornment,
	CircularProgress
} from '@mui/material';

import { LockOutlined, Email, Password, Google, Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { type FormType } from './formType';
import { useLogin, useRegister } from './query-login';
import type { UserType } from './UserType';


export default function LoginForm({ type = "login", toggleMode }: { type: "login" | "register", toggleMode: () => void }) {

	const { mutate: registerMute, isError: isRegisterError, isSuccess: isRegisterSuccess, isPending: isRegisterPending, error: registerError } = useRegister();

	const { mutate: loginMute, isError: isLoginError, isSuccess: isLoginSuccess, isPending: isLoginPending, error: loginError } = useLogin();

	const { register, formState, handleSubmit, getValues } = useForm<FormType>(
		{
			mode: "onChange"
		}
	);

	const { errors } = formState;
	const thereIsError = isRegisterError || isLoginError;
	const thereIsSuccess = isRegisterSuccess || isLoginSuccess;
	const thereIsPending = isRegisterPending || isLoginPending;


	function onSubmit(data: UserType) {
		if (type === "register") {
			registerMute(data);
			console.log("Signing up:", data);
			console.log(registerError);
		} else {
			loginMute({ email: data.email, password: data.password, rememberMe: data.rememberMe || false });
			console.log("Signing in:", data);
			console.log(loginError);
		}
	}


	return (
		<form onSubmit={handleSubmit(onSubmit)}
			className='p-4 flex flex-col gap-4 bg-black
			sm:w-96 sm:mx-auto sm:rounded-lg 
			'

		>

			{/* Header */}
			<Box sx={{ textAlign: 'center', mb: 2 }}>
				<Box
					sx={{
						width: 56,
						height: 56,
						borderRadius: '50%',
						backgroundColor: 'primary.main',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '0 auto 16px',
					}}
				>
					<LockOutlined sx={{ color: 'white' }} />
				</Box>
				<Typography component="h1" variant="h5" fontWeight="bold">
					{type == "register" ? "Register" : "Login"}
				</Typography>
			</Box>

			{/* Email Field */}
			<TextField
				{...register('email', {
					required: 'Email is required',
					validate: {
						unValidEmail: (value) => {
							if (!value) return 'Email is required';
							const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
							return emailPattern.test(value) || 'Invalid email address';
						}
					}
				})}
				error={!!errors.email}
				helperText={errors.email ? errors.email.message : ''}
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Email sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						),
					},
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						'&.Mui-focused fieldset': {
							borderColor: 'info.main',
						},
					},
					'& .MuiInputLabel-root.Mui-focused': {
						color: 'info.main',
					},
				}}
			/>

			{type === 'register' && <TextField
				{...register("username", {
					required: 'User Name is required',
				})}
				required
				fullWidth
				id="username"
				label="User Name"
				name="username"
				autoComplete="username"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Person sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						),
					},
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						'&.Mui-focused fieldset': {
							borderColor: 'info.main',
						},
					},
					'& .MuiInputLabel-root.Mui-focused': {
						color: 'info.main',
					},
				}}
			/>}

			{/* Password Field */}
			<TextField
				{...register("password", { required: true })}
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Password sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						),
					},
				}}

				sx={{
					'& .MuiOutlinedInput-root': {
						'&.Mui-focused fieldset': {
							borderColor: 'info.main',
						},
					},
					'& .MuiInputLabel-root.Mui-focused': {
						color: 'info.main',
					},
				}}
			/>

			{type === 'register' && < TextField
				{...register("confirmPassword", {
					required: true,
					validate: value => value === getValues("password") || "confirm password do not match the password"
				})}
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
				required
				fullWidth
				name="confirmPassword"
				label="Confirm Password"
				type="password"
				id="confirmPassword"
				autoComplete="current-password"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Password sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						),
					},
				}}

				sx={{
					'& .MuiOutlinedInput-root': {
						'&.Mui-focused fieldset': {
							borderColor: 'info.main',
						},
					},
					'& .MuiInputLabel-root.Mui-focused': {
						color: 'info.main',
					},
				}}
			/>}

			{/* Error Messages */}
			{thereIsError && <Typography color="error.main" variant="body2" sx={{ mt: 1 }}>
				{type === "register" ? registerError?.message : loginError?.message}
			</Typography>}
			{thereIsSuccess && <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
				{type === "register" ? "Registration successful! Please log in." : "Login successful!"}
			</Typography>}



			{/* Remember Me & Forgot Password */}
			{type === 'login' && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<FormControlLabel
					{...register("rememberMe")}
					control={
						<Checkbox
							name="remember"
							color="info"
						// checked={formData.remember}
						// onChange={handleChange}
						/>
					}
					label="Remember me"
				/>
				{/* <Link href="#" variant="body2" color='info.main'> */}
				{/* 	Forgot password? */}
				{/* </Link> */}
			</Box>}

			{/* Submit Button */}
			{thereIsPending ? <CircularProgress /> : < Button
				type="submit"
				fullWidth
				variant="contained"
				size="large"
				sx={{ mt: 1, py: 1.5 }}
			>
				{type === "login" ? " Login" : "Register"}
			</Button>}

			{/* Divider */}
			{
				type === "login" && <> <Divider sx={{ my: 2 }}>
					<Typography variant="caption" color="text.secondary">
						OR
					</Typography>
				</Divider>

					{/* Social Login Buttons */}
					<Button
						fullWidth
						variant="outlined"
						sx={{ py: 1.5, mb: 2, backgroundColor: "gray" }}
					>
						<Google sx={{ mr: 1 }} />
						Continue with Google
					</Button></>
			}

			{/* Sign Up Link */}
			<Box sx={{ textAlign: 'center' }}>
				<Typography variant="body2">
					{type === 'login' ? "Don't have an account? " : "Already have an account? "}
					<Button
						onClick={toggleMode}
						sx={{
							textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
							color: 'info.main',
						}}
					>
						{type === "login" ? "Register" : "Login"}
					</Button>
				</Typography>
			</Box>
		</form >
	);
};

