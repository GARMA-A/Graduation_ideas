import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	description: {
		type: String,
		trim: true,
		default: "",
	},
	favorite: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });

noteSchema.index({ userId: 1, favorite: 1 });

export const Notes = mongoose.model('Notes', noteSchema);
