import Lote from "../models/Lote";
import Archivo from "../models/Archivo";

export const getLotes = async (req, res) => {
  const { idUsuario } = req.body;
  try {
    const lotes = await Lote.find({ idUsuario: idUsuario });

    if (!lotes) {
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
  const { idUsuario, numeroArchivos, rutaLote, archivos, vigencia } = req.body;
  try {
    const newLote = new Lote({
      idUsuario,
      numeroArchivos,
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

export const downloadLote = async (req, res) => {
  const { idLote } = req.body;
  try {
    const lotes = await Lote.findById({ idLote });

    if (lotes.length == 0) {
      return res
        .status(404)
        .json({ message: "No existe ese lote para este usuario" });
    }

    return res.status(200).json(lotes[0].rutaLote);
  } catch (error) {
    console.log(error);
  }
};
