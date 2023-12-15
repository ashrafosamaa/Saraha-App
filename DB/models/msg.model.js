import { Schema, model, Types } from "mongoose";

const msgSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sendTo: {
        type: Types.ObjectId,
        ref: 'User', 
        required: true
    },
    isViewed: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const Msg = model('Msg', msgSchema)

export default Msg