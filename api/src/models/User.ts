import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate: {
			validator: function(v: string) {
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	rememberMe: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
