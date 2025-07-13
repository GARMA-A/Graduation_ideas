import mongoose from 'mongoose';


const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });

export const Notes = mongoose.model('Notes', noteSchema);
