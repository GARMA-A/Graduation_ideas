import {
	Box,
	TextField,
	Button,
	Typography,
	Link,
	Checkbox,
	FormControlLabel,
	Divider,
	InputAdornment
} from '@mui/material';

import { LockOutlined, Email, Password, Google, Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { type FormType } from './formType';


export default function LoginForm({ type = "signin" }: { type: "signin" | "signup" }) {

	const { register, formState, handleSubmit } = useForm<FormType>(
		{
			mode: "onChange"
		}
	);
	const { errors } = formState;

	function onSubmit(data: FormType) {
		// Handle form submission logic here
		console.log(data);
		if (type === "signup") {
			// Handle signup logic
			console.log("Signing up:", data);
		} else {
			// Handle signin logic
			console.log("Signing in:", data);
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
					{type == "signup" ? "Sign up" : "Sign in"}
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

			{type === 'signup' && <TextField
				required
				fullWidth
				id="username"
				label="User Name"
				name="username"
				autoComplete="username"
				autoFocus
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

			{type === 'signup' && < TextField
				{...register("confirmPassword", { required: true })}
				required
				fullWidth
				name="confirmPassword"
				label="Confirm Password"
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
			/>}

			{/* Remember Me & Forgot Password */}
			{type === 'signin' && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
				<Link href="#" variant="body2" color='info.main'>
					Forgot password?
				</Link>
			</Box>}

			{/* Submit Button */}
			<Button
				type="submit"
				fullWidth
				variant="contained"
				size="large"
				sx={{ mt: 1, py: 1.5 }}
			>
				{type === "signin" ? "Sign In" : "Sign Up"}
			</Button>

			{/* Divider */}
			{type === "signin" && <> <Divider sx={{ my: 2 }}>
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
				</Button></>}

			{/* Sign Up Link */}
			<Box sx={{ textAlign: 'center' }}>
				<Typography variant="body2">
					{type === 'signin' ? "Don't have an account? " : "Already have an account? "}
					<Link href="#" variant="body2"
						color="info.main"
						sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
					>
						{type === "signin" ? "Sign Up" : "Sign In"}
					</Link>
				</Typography>
			</Box>
		</form>
	);
};

