const mongoose = require("mongoose");
const validator = require("validator");

const Usuario = mongoose.Schema("Usuario", {
    nombre: {
        type: String,
        required: true,
        trim: true
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
        }
    },
    constrasenya: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
});
