const express = require('express');
const catController = require('../controllers/catController');
const router = express.Router()

router
    .route('/getAveAge')
    .get(catController.getAveAge)
router
    .route('/getOldestAge')
    .get(catController.getOldestAge)
router
    .route('/getBreed')
    .get(catController.getBreed)
router
    .route('/getYoungestByName')
    .get(catController.getYoungestByName)
router
    .route('/getByAge')
    .get(catController.getByAge)
router
    .route('/getTotalCats')
    .get(catController.getTotalCats)

router
    .route('/')
    .get(catController.getAllCats)
    .post(catController.postAllCats)
router
    .route('/postCat')
    .post(catController.postCat)
router
    .route('/:id')
    .delete(catController.deleteCat)
    .get(catController.getCat)
    .patch(catController.updateCat)

module.exports = router;