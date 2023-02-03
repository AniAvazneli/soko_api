import mongoose from "mongoose";

const { Schema } = mongoose;

const subCategorySchema = new Schema({
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

const subCategory = mongoose.model("subCategory", subCategorySchema);

export default subCategory;
