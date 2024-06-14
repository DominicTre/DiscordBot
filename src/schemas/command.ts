import Mongoose from 'mongoose';

const Command = new Mongoose.Schema({
    _id: String, // guildId
    commands: {
        type : Map,
        of : {
            products : [
                {
                    name : String,
                    price : Number,
                    amount : Number
                }
            ],
            created : {type : Boolean, default: false},
            createdBy :  {type : Number, default: 0},
            completed :  {type : Boolean, default: false},
            completedBy :  {type : Number, default: 0}
        }
    }
});

export default Mongoose.model('command', Command);

export type ProductType = Mongoose.Document<
	unknown,
	any,
	Mongoose.InferSchemaType<typeof Command>
> &
	Mongoose.InferSchemaType<typeof Command>;
