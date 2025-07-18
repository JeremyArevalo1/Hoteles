import { Schema, model } from "mongoose";

const HotelChema = Schema({
    nameHotel: {
        type: String,
        required: [true, 'Name required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    hotelAddresss: {
        type: String,
        required: [true, 'Hotel Address required'],
        maxLength: [50, 'Cant be overcome 50 characters']
    },
    services: [
        {
            typeService: {
                type: String,
                required: false,
                maxLength: [25, 'Cant be overcome 25 characters']
            },
            description: {
                type: String,
                required: false,
                maxLength: [200, 'Cant be overcome 200 characters']

            },
            priceService: {
                type: Number,
                required: false,
                min: [1, 'Price must be greater than 1']
            }
        }
    ],
    keeperRooms: [{
        type : Schema.Types.ObjectId,
        ref: 'Room',
        required: false
    }],
    keeperCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    keeperAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    keeperEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    }],
    state: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true,
    versionKey: false
});

export default model('Hotel', HotelChema);