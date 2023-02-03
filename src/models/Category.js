import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name : {
        type: Schema.Types.String,
        require: true,
    },
    id : {
        type: Schema.Types.String,
        require: true,
    }

})

const Category = mongoose.model("Category", categorySchema);

export default Category;