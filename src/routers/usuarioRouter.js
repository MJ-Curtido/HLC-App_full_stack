const express = require("express");
const Usuario = require("../models/usuario");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/usuarios/registro", async (req, res) => {
  const usuario = new Usuario(req.body);

  try {
    await usuario.save();
    const token = await usuario.generateAuthToken();
    res.status(201).send({ usuario, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/usuarios/iniciarsesion", async (req, res) => {
  try {
    const usuario = await Usuario.findByCredentials(
      req.body.email,
      req.body.contrasenya
    );
    const token = await usuario.generateAuthToken();

    res.send({ usuario, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/usuarios/cerrarsesion", auth, async (req, res) => {
  try {
    req.usuario.tokens = req.usuario.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.usuario.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/usuarios/yo', auth, async (req, res) => {
  res.send(req.usuario);
});

router.patch("/usuarios/yo", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "nombre",
    "email",
    "contrasenya",
    "fechaNacimiento",
    "telefono",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Updates inválidas :(" });
  }

  try {
    updates.forEach((update) => (req.usuario[update] = req.body[update]));
    await req.usuario.save();

    res.send(req.usuario);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/usuarios/yo", async (req, res) => {
  try {
    await req.usuario.remove();

    res.send(usuario);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
