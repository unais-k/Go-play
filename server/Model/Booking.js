import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        turf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ground",
        },
        bookDate: {
            type: Date,
            required: true,
        },
        time: {type:Array},
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
        },
        payment: {
            type: String,
            required: true,
            default: "Pending",
        },
        price: {
            type: String,
            required: true,
        },
        paymentId:{
            type:String
        }
    },
    {
        timestamps: true,
    }
);

const bookingModel = mongoose.model("booking", bookingSchema);
export default bookingModel;
