const listingModel = require('../models/listing.model')

class listingController {
    static createListing = async (req,res,next)=>{
        try {
            const data = await listingModel.create(req.body)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}


module.exports  = listingController;