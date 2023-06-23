const router = require('express').Router()
const {newListing, getAllListings, updateListings} = require('../controller/listingsController')

router.post('/listing/add', newListing)
router.get('/listings', getAllListings )
router.put('listings/update/:type', updateListings)

module.exports = router;
