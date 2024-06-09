import Mongoose from 'mongoose';

const Product = new Mongoose.Schema({
    _id: String, // guildId
    products: [
        {
            name: String,
            price: Number
        }
    ]
});

export default Mongoose.model('product', Product);

export type ProductType = Mongoose.Document<
	unknown,
	any,
	Mongoose.InferSchemaType<typeof Product>
> &
	Mongoose.InferSchemaType<typeof Product>;
