import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
    name : {
        type: Schema.Types.String,
        require: true,
    },
    id : {
        type: Schema.Types.String,
        require: true,
    }

})

const Event = mongoose.model("Event", eventSchema);

export default Event;