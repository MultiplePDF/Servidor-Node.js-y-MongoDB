import Lote from "../models/Lote";
import Transaccion from "../models/Transaccion";

export const getLotes = async (req, res) => {
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
  }
};

export const createLote = async (req, res) => {
  const { idUsuario, numeroArchivos, rutaCarpeta, rutaLote, archivos, vigencia } = req.body;
  try {
    const newLote = new Lote({
      idUsuario,
      numeroArchivos,
      rutaCarpeta,
      rutaLote,
      archivos,
      vigencia,
      estado: true,
    });

    const loteSaved = await newLote.save();

    res.status(201).json(loteSaved);
  } catch (error) {
    console.log(error);
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
  }
};

export const uploadfiles = async (req, res) => {
  const { idUsuario } = req.body;
  try {
    const lotes = await Lote.find({ idUsuario });

    if (lotes.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe archivos para este usuario" });
    }

    return res.status(200).json(lotes[0].archivos);
  } catch (error) {
    console.log(error);
  }
};

//Nota: para descargar el lote recien creado debe ser pasada la id del lote que se encuentra en el indice 0 de la lista de lotes
export const downloadLote = async (req, res) => {
  const { idLote } = req.body;
  try {
    const lotes = await Lote.findById(idLote);
    let numaccion=1;

    /*if (lotes.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe ese lote para este usuario" });
    }*/
    createTransaccion(idLote,numaccion);
    return res.status(200).json(lotes.rutaLote);
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (req, res) => {
  const { idLote, fileIdx } = req.body;
  try {
    const lote = await Lote.findById(idLote);
    let newaccion=0;
    
    /*if (!lote) {
      return res
        .status(404)
        .json({ message: "No existe ese lote para este usuario" });
    }*/

    createTransaccion(idLote,newaccion);

    const file = lote.archivos[fileIdx];//el cliente debe mandar el indice con -1

    return res.status(200).json(file.rutaArchivo);
  } catch (error) {
    console.log(error);
  }
};

 async function createTransaccion(idLote, accion)  {
  try {
    const newTransaccion = new Transaccion({
      idLote,
      accion,
    });

    const transaccionSaved = await newTransaccion.save();

  } catch (error) {
    console.log(error);
  }
};

