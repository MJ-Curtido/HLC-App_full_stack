const express = require("express");
const Compra = require("../models/compra");
const Curso = require("../models/curso");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/compras/comprar", auth, async (req, res) => {
    const curso = await Curso.findOne({ _id: req.body.curso });

    const compra = new Compra({
        curso: curso._id,
        usuario: req.usuario._id
    });

    try {
        await compra.save();

        res.status(201).send(compra);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/compras/yo', auth, async (req, res) => {
    try {
        const compras = await Compra.find({ usuario: req.usuario._id }).populate('curso');

        let listaCursos = [];
        compras.forEach(compra => {
            listaCursos.push(compra.curso);
        });

        res.send(listaCursos);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;
