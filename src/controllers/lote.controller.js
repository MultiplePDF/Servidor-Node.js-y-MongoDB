import Lote from "../models/Lote";
import Transaccion from "../models/Transaccion";

export const loteExist = async (req, res) => {
  const { idUsuario } = req.body;
  try {
    const lotes = await Lote.find({ idUsuario });

    if (lotes.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe una carpeta asignada para ese usuario" });
    }

    return res.status(200).json(lotes[0].rutaCarpeta);
  } catch (error) {
    console.log(error);
    return res
        .status(404)
        .json({ message: "No existe una carpeta asignada para ese usuario" });
  }
};

export const createLote = async (req, res) => {
  const {
    idUsuario,
    numeroArchivos,
    rutaCarpeta,
    rutaLote,
    archivos,
    vigencia,
  } = req.body;
  try {
    let numaccion2 = 2;
    const newLote = new Lote({
      idUsuario,
      numeroArchivos,
      rutaCarpeta,
      rutaLote,
      archivos,
      vigencia,
      estado: true,
    });

    await newLote.save();
    createTransaccion(newLote._id, numaccion2);

    res.status(201).json({ message: "El lote fue creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "El lote no fue creado con exito" });
  }
};

export const uploadLotes = async (req, res) => {
  const { idUsuario } = req.body;
  try {
    const lotes = await Lote.find({ idUsuario });

    if (lotes.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe lotes para este usuario" });
    }

    return res.status(200).json(lotes);
  } catch (error) {
    console.log(error);
    return res
        .status(404)
        .json({ message: "Se presento un error al buscar lotes" });
  }
};

export const uploadfiles = async (req, res) => {
  const { idLote } = req.body;
  try {
    const lotes = await Lote.findById(idLote);

    return res.status(200).json(lotes.archivos);
  } catch (error) {
    console.log(error);
    return res
    .status(404)
    .json({ message: "Se presento un error al buscar archivos" });
  }
};

//Nota: para descargar el lote recien creado debe ser pasada la id del lote que se encuentra en el indice 0 de la lista de lotes
export const downloadLote = async (req, res) => {
  const { idLote } = req.body;
  try {
    const lotes = await Lote.findById(idLote);
    let numaccion = 1;

    createTransaccion(idLote, numaccion);
    return res.status(200).json(lotes.rutaLote);
  } catch (error) {
    console.log(error);
    return res
        .status(404)
        .json(null);
  }
};

export const downloadFile = async (req, res) => {
  const { idLote, fileIdx } = req.body;
  try {
    const lote = await Lote.findById(idLote);
    let newaccion = 0;

    createTransaccion(idLote, newaccion);

    const file = lote.archivos[fileIdx]; //el cliente debe mandar el indice con -1

    return res.status(200).json(file.rutaArchivo);
  } catch (error) {
    console.log(error);
    return res
    .status(404)
    .json(null);
  }
};

async function createTransaccion(idLote, accion) {
  try {
    const newTransaccion = new Transaccion({
      idLote,
      accion,
    });

    await newTransaccion.save();
  } catch (error) {
    console.log(error);
  }
};

export async function changeEstado(idLote, estado) {
  try {
    let newaccion2 = -1;
    const lote = await Lote.findById(idLote);

    if (estado == true) {
      lote.estado = false;
      await lote.save();
      createTransaccion(idLote, newaccion2);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

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
