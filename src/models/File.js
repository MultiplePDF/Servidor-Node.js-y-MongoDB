import {Schema, model} from "mongoose";

const fileSchema = new Schema(
    {
        fileName: String,
        size: Number,
        filePath: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("File", fileSchema);
