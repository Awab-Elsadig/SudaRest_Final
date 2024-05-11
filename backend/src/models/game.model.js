import { model, Schema } from 'mongoose';

export const GameSchema = new Schema(
	{
		title: { type: String, required: true },
		numberPlayed: { type: Number, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

export const gameModel = model('games', GameSchema);
