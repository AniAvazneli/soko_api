import mongoose from "mongoose";

const { Schema } = mongoose;

const miniEventSchema = new Schema({
  eventId: {
    type: Schema.Types.String,
    require: true,
  },
  name: {
    type: Schema.Types.String,
    require: true,
  },
  id: {
    type: Schema.Types.String,
    require: true,
  },
});

const miniEvent = mongoose.model("MiniEvent", miniEventSchema);

export default miniEvent;
