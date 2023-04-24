import { Schema, model } from "mongoose";

const transactionSchema=new Schema({
    batchID:String,
    action:Number, //accion -1 = eliminarArchivo, accion 0 = descargarArchivo, accion 1 = descargarLote, accion 2 = crearLote
},{
    timestamps: true,
    versionKey: false,
});

export default model("Transaction",transactionSchema);
