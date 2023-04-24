import { Schema, model } from "mongoose";
import File from "./File";

const batchSchema = new Schema(
  {
    userId: String,
    numberFiles: Number,
    folderPath: String,
    batchPath: String,
    files: [{ type: Object, ref: File }], //archivos
    validity: Date,
    status: Boolean, //la accion true significa lote vigente, false significa lote caducado
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Batch", batchSchema);
