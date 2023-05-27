const mongoose = require("mongoose");
const { Schema } = mongoose;

const petSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    adoption_status: { type: String, required: true },
    picture: { type: String, required: false },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    bio: { type: String, required: false },
    hypoallergenic: { type: Boolean, required: true },
    dietary_restrictions: { type: Array, required: false },
    breed: { type: String, required: true },
    owner_id: { type: String, required: false },
    favorite: { type: Array, required: false },
    date: { type: Date, default: Date.now },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
