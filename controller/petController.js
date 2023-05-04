const petModel = require("../models/petModels")

async function petGet(req, res) {
    try {
        const petObj = await petModel.findPetModel("id", req.body.id)
        res.status(200).send(petObj)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}



module.exports = { petGet }