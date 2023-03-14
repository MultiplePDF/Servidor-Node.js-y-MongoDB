import { Schema, model } from "mongoose";

const transaccionSchema=new Schema({
    idLote:String,
    accion:Number, //la accion 0 define que se descarga un archivo y la accion 1 que se descarga todo el lote
},{
    timestamps: true,
    versionKey: false,
});

export default model("Transaccion",transaccionSchema);