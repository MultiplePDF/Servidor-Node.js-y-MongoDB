import { Schema, model } from "mongoose";

const archivoSchema = new Schema(
  {
    nombreArchivo: String,
    tamanno: Number,
    rutaArchivo: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Archivo", archivoSchema);
