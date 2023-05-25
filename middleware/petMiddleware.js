const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer')
const Joi = require('joi');





function checkSchemaForPet(req, res, next) {
    const addPetSchema = Joi.object({
        type: Joi.string().valid('Dog', 'Cat').required(),
        adoption_status: Joi.string().valid('Available', 'Fostered').required(),
        name: Joi.string().required(),
        owner_id: Joi.string().allow(''),
        height: Joi.number().required().positive().max(150),
        weight: Joi.number().required().positive().max(60),
        color: Joi.string().required(),
        breed: Joi.string().required(),
        bio: Joi.string().allow(''),
        hypoallergenic: Joi.boolean().required(),
        dietary_restrictions: Joi.array().items(Joi.string()).allow(''),
        picture: Joi.string().allow('')
    });
    const { userId, ...pet } = req.body;
    const { error } = addPetSchema.validate(pet);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    } else {
        next();
    }
}


cloudinary.config(JSON.parse(process.env.Cloudinary_config));


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    filename: function (req, file, cb) {
        cb(null, req.body.name + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

module.exports = { upload ,checkSchemaForPet}