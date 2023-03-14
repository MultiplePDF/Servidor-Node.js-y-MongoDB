import { Schema, model } from "mongoose";

const loteSchema = new Schema(
  {
    idUsuario: String,
    numeroArchivos: Number,
    rutaCarpeta: String,
    rutaLote: String,
    archivos: Object, //id archivos
    vigencia: Date,
    estado: Boolean, //la accion true significa lote vigente, false significa lote caducado
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Lote", loteSchema);
