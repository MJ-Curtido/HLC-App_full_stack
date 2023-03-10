const express = require("express");
const Curso = require("../models/curso");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/cursos/crear", auth, async (req, res) => {
  let curso = new Curso({
    ...req.body,
    creador: req.usuario._id,
  });

  try {
    await curso.save();
    curso = await Curso.findById(curso._id).populate('creador');
    res.status(201).send(curso);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/cursos/miscursos', auth, async (req, res) => {
  try {
      const cursos = await Curso.find({ creador: req.usuario._id }).populate('creador');

      if(cursos.length == 0) {
        return res.status(404).send({ error: 'No has creado ningún curso.' });
      }

      res.send(cursos);
  } catch (e) {
      res.status(500).send(e);
  }
});

router.patch("/cursos/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "nombre",
    "descripcion",
    "precio",
    "fechaInicio",
    "fechaActualizacion",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Updates inválidas :(" });
  }

  try {
    const curso = await Curso.findById(req.params.id);

    if (!curso) {
      return res.status(404).send();
    }

    updates.forEach((update) => (curso[update] = req.body[update]));
    await curso.save();

    res.send(curso);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/cursos/:id", async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);

    if (!curso) {
      res.status(404).send();
    }

    res.send(curso);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
