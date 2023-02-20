const mongoose = require("mongoose");
const Compra = require("./compra");

const CursoSchema = mongoose.Schema(
  "Curso",
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      trim: true,
      validator(value) {
        if (value < 0) {
          throw new Error("Precio inválido");
        }
      },
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

CursoSchema.methods.toJSON = () => {
  const curso = this;
  const objectCurso = curso.toObject();
  const creador = objectCurso.creador;

  delete objectCurso.creador;
  objectCurso.creador = creador.nombre;

  return objectCurso;
};

CursoSchema.pre("remove", async (next) => {
  const course = this;
  await Compra.deleteMany({ curso: curso._id });
  next();
});

const Curso = mongoose.model("Curso", CursoSchema);
module.exports = Curso;
