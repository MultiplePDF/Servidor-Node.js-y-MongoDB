import { Schema, model } from "mongoose";

const transaccionSchema=new Schema({
    idLote:String,
    accion:Number, //accion -1 = eliminarArchivo, accion 0 = descargarArchivo, accion 1 = descargarLote, accion 2 = crearLote
},{
    timestamps: true,
    versionKey: false,
});

export default model("Transaccion",transaccionSchema);