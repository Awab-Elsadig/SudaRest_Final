import { model, Schema } from 'mongoose';

export const RestaurantSchema = new Schema(
	{
		name: { type: String, required: true },
		fakeImageUrl: { type: String, required: true },
		totalOrders: { type: Number, required: true },
		menu: [
			{
				name: { type: String, required: true },
				imageUrl: { type: String, required: true },
				price: { type: Number, required: true },
				rating: { type: Number, required: true },
				orders: { type: Number, required: true },
			},
		],
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

export const RestaurantModel = model('restaurant', RestaurantSchema);
