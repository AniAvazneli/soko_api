import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceSchema = new Schema({
    name : {
        type: Schema.Types.String,
        require: true,
    },
    id : {
        type: Schema.Types.String,
        require: true,
    },
    city : {
        type: Schema.Types.String,
        require: false,
    },
    address : {
        type: Schema.Types.String,
        require: false,
    },
    flexLocation : {
        type: Schema.Types.String,
        require: false,
    },
    price: {
        type: Schema.Types.String,
        require: false,
    },
    flexPrice: {
        type: Schema.Types.String,
        require: false,
    },
    description: {
        type: Schema.Types.String,
        require: false,
    },
    question: {
        type: Schema.Types.String,
        require: false,
    },
    gallery : {
        type: Schema.Types.String,
        require: false,
    }
})

const Service = mongoose.model("Service", serviceSchema);

export default Service;