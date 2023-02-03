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
    useId : {
        type: Schema.Types.String,
        require: true,
    },
    eventType : {
        type: Schema.Types.Mixed,
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
        type: Schema.Types.Boolean,
        require: false,
    },
    price: {
        type: Schema.Types.Number,
        require: false,
    },
    currency: {
        type: Schema.Types.String,
        require: false,
    },
    unit: {
        type: Schema.Types.String,
        require: false,
    },
    flexPrice: {
        type: Schema.Types.Boolean,
        require: false,
    },
    description: {
        type: Schema.Types.String,
        require: false,
    },
    questions: {
        type: Schema.Types.Mixed,
        require: false,
    },
    gallery : {
        type: Schema.Types.Mixed,
        require: false,
    }
})

const Service = mongoose.model("Service", serviceSchema);

export default Service;