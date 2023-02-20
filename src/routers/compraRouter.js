const express = require("express");
const Compra = require("../models/compra");
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

router.get('/compras', async (req, res) => {
    try {
        const compras = await Compra.find({});

        res.send(compras);
    } catch(e) {
        res.status(500).send();
    }
});
