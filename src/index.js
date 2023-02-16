const express = require("express");
require("./db/mongoose");

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at:${port}`);
});
