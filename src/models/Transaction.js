import { Schema, model } from "mongoose";

const transactionSchema=new Schema({
    batchID:String,
    action:Number, //action -1 = file deleted, action 0 = file downloaded, action 1 = batch downloaded, action 2 = batch created
},{
    timestamps: true,
    versionKey: false,
});

export default model("Transaction",transactionSchema);
