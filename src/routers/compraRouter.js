const express = require("express");
const Compra = require("../models/compra");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/compras", async (req, res) => {
    const compra = new Compra(req.body);

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
