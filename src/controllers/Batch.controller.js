import Batch from "../models/Batch";
import Transaction from "../models/Transaction";
import {contentSecurityPolicy} from "helmet";

export const batchExist = async (req, res) => {
  const { userId } = req.body;
  try {
    const batch = await Batch.find({ userId });

    if (batch.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe una carpeta asignada para ese usuario" });
    }

    return res.status(200).json(batch[0].rutaCarpeta);
  } catch (error) {
    console.log(error);
    return res
        .status(404)
        .json({ message: "No existe una carpeta asignada para ese usuario" });
  }
};

export const createBatch = async (req, res) => {
  const {
    userId,
    numberFiles,
    folderPath,
    batchPath,
    files,
    validity,
  } = req.body;
  try {
    let numaccion2 = 2;
    const newBatch = new Batch({
      userId,
      numberFiles,
      folderPath,
      batchPath,
      files,
      validity,
      status: true,
    });

    await newBatch.save();
    createTransaction(newBatch._id, numaccion2);

    res.status(201).json({ message: "El lote fue creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "El lote no fue creado con exito" });
  }
};

export const callBatches = async (req, res) => {
  const { userId } = req.body;
  try {
    const batches = await Batch.find({ userId });

    if (batches.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe lotes para este usuario" });
    }

    return res.status(200).json(batches);
  } catch (error) {
    console.log(error);
    return res
        .status(404)
        .json({ message: "Se presento un error al buscar lotes" });
  }
};

export const callFiles = async (req, res) => {
  const { batchID } = req.body;
  try {
    console.log(batchID)
    const batches = await Batch.findById(batchID);

    return res.status(200).json(batches.files);
  } catch (error) {
    console.log(error);
    return res
    .status(404)
    .json({ message: "Se presento un error al buscar archivos" });
  }
};

//Nota: para descargar el lote recien creado debe ser pasada la id del lote que se encuentra en el indice 0 de la lista de lotes
export const downloadBatch = async (req, res) => {
  console.log(req)
  const { batchId } = req.body;
  console.log(batchId)
  try {
    const batches = await Batch.findById(batchId);
    let numAction = 1;

    createTransaction(batchId, numAction);
    return res.status(200).json(batches.batchPath);
  } catch (error) {
    console.log(error);
    return res
        .status(404)
        .json(null);
  }
};

export const downloadFile = async (req, res) => {
  const { batchId, fileIdx } = req.body;
  try {
    const batch = await Batch.findById(batchId);
    let newaccion = 0;

    createTransaction(batchId, newaccion);

    const file = batch.files[fileIdx]; //el cliente debe mandar el indice con -1

    return res.status(200).json(file.filePath);
  } catch (error) {
    console.log(error);
    return res
    .status(404)
    .json(null);
  }
};

async function createTransaction(batchId, action) {
  console.log(batchId)
  console.log(action)
  try {
    const newTransaccion = new Transaction({
      batchId,
      action,
    });

    await newTransaccion.save();
  } catch (error) {
    console.log(error);
  }
};

export const changeState = async (req, res) => {
  try{  let { batchId, status } = req.body;
    //console.log(batchId)
    //console.log(status)
    let newACtion=-1

    const batch = await Batch.findById(batchId);
    console.log(batch.status)
    if (status === batch.status) {

      batch.status = false

      await batch.save()

      createTransaction(batchId, newACtion);
      console.log("Entre")
      return res
          .status(200)
          .json({ message: "Se cambio el estado" });
    }else {
      return res
          .status(200)
          .json({ message: "El estado ya esta alterado" });

    }
  } catch (error) {
    return res
        .status(404)
        .json(error);
  }

};


//export async function changeState2(batchID, estado) {
  //try {


    //console.log(batchID)
    //console.log(estado)

    //let newaccion2 = -1


    //const batch = await Batch.findById(batchID);

    //if (estado == true) {
      //batch.status = false
      //await batch.save()
      //createTransaccion(batchID, newaccion2);
      //return true;
    //}
  //} catch (error) {
    //console.log("error");
    //return false;
  //}
//}

async function audit(){
  try {
    let hour=23,minutes=59,seconds=59;

    const date1=new Date();
    date1.setDate(date1.getDate()-2);
    date1.setHours(hour);
    date1.setMinutes(minutes);
    date1.setSeconds(seconds);
    const date2=new Date();
    date2.setDate(date2.getDate()-1);
    date2.setHours(hour);
    date2.setMinutes(minutes);
    date2.setSeconds(seconds);
    const dateRange= {$gte:date1,$lt:date2}

    console.log(date1);
    console.log(date2);

    const transactionN = await Transaction.find({createdAt:dateRange});

    console.log(transactionN)

  } catch (error) {
    console.log(error);
  }
}

export const test = async (req, res) => {
  audit()
}
/*export const changeEstado = async (req, res) => {
  const { idLote, estado } = req.body;
  try {
    let newaccion2 = -1;
    const lote = await Lote.findById(idLote);

    if (estado == true) {
      lote.estado = false;
      await lote.save();
      createTransaccion(idLote, newaccion2);
    }
    return res.status(200).json(idLote);
  } catch (error) {
    console.log(error);
  }
};*/
