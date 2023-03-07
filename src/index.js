const express = require("express");
require("./db/mongoose");
const usuarioRouter = require("./routers/usuarioRouter");
const cursoRouter = require("./routers/cursoRouter");
const compraRouter = require("./routers/compraRouter");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(usuarioRouter);
app.use(cursoRouter);
app.use(compraRouter);

app.listen(port, () => {
  console.log(`Example app listening at: ${port}`);
});
