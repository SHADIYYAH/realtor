const dbConnection = require('../config/db');
const {getAllListingsFromDB , updateListingsInDB} = require('../model/listingModel');
const listingsValidation = require('../validation/listingValidation')
const {v4: uuidv4} = require('uuid');

const newListing = (req, res) => {
    const {type, location, purpose, age_of_property, asking_price} = req.body
      const {error, value} = listingsValidation(req.body)
    if(error !== undefined){
        return res.status(400).json({
            status: 'false',
            msg: error.details[0].message 
        })
    }

  //insert listings to db
  const listing_id = uuidv4();
  dbConnection.query({
    sql: `insert into listings (listing_id, type, location, purpose, age_of_property, asking_price ) values(?,?,?,?,?,?)`,
    values: [ listing_id , type, location, purpose, age_of_property, asking_price]
  },(err, result) =>{
    if(err){
        res.status(400).json({
            status: 'false', 
            msg: err.message
        })
        return;
    }
      res.status(200).json({
        ok: 'true',
        msg: 'Listing added successfully ',
      })
  })

}


const getAllListings =async (req, res) => {
  try{
   const allListings  = await getAllListingsFromDB()
   res.status(200).json({
    status: true,
    msg: 'Listings successfully fetched',
    data: allListings
   })
  }catch (err){
   res.status(400).json({
    status: false,
    msg: 'Oops, something went wrong'
   })
   
  }
}

const updateListings = async (req, res) => {
    const{ type } = req.params
    try{
        const keys = Object.keys(req.body);
        const data = keys.map(item => {
            `${item} = '${req.body[item]}'`
        })

        const updateRES = await updateListingsInDB(data, type)
        res.status(200).json({
            status: true,
            msg: 'Listing updated successfully',
            data: updateRES
        })
   
    }catch(err){
       res.status(500).json({
        status: false,
        msg: 'Sorry, try again'
       })
    }
}



module.exports = {newListing, getAllListings, updateListings}