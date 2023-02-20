const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email inválido");
      }
    },
  },
  constrasenya: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
    trim: true,
    validate(value) {
      if (value >= Date.now()) {
        throw new Error("Fecha de nacimiento inválida");
      }
    },
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Teléfono inválido");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

usuarioSchema.methods.toJSON = () => {
  const usuario = this;
  const objectUsuario = usuario.toObject();

  delete objectUsuario.contrasenya;
  delete objectUsuario.tokens;

  return objectUsuario;
};

usuarioSchema.methods.generateAuthToken = async () => {
  const usuario = this;
  const token = jwt.sign({ _id: usuario._id.toString() }, "nuevocurso");

  usuario.tokens = usuario.tokens.concat({ token });
  await usuario.save();

  return token;
};

usuarioSchema.statics.findByCredentials = async (email, contrasenya) => {
  const usuario = await User.findOne({ email });

  if (!usuario) {
    throw new Error("No se ha podido iniciar sesión.");
  }

  const isMatch = await bcrypt.compare(contrasenya, usuario.contrasenya);

  if (!isMatch) {
    throw new Error("No se ha podido iniciar sesión.");
  }

  return usuario;
};

usuarioSchema.pre("save", async (next) => {
  const usuario = this;
  if (usuario.isModified("contrasenya")) {
    usuario.contrasenya = await bcrypt.hash(usuario.contrasenya, 8);
  }
  next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
