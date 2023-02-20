const express = require("express");
require("./db/mongoose");
const usuarioRouter = require("./routers/usuario");
const cursoRouter = require("./routers/curso");
const compraRouter = require("./routers/compra");

const app = express();
const port = 3000;

app.use(express.json());
app.use(usuarioRouter);
app.use(cursoRouter);
app.use(compraRouter);

app.listen(port, () => {
  console.log(`Example app listening at: ${port}`);
});
