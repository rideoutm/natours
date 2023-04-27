const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

const {
  getAllTours,
  getTour,
  addTour,
  updateTour,
  deleteTour,

  checkId,
} = tourController;

router.param('id', checkId);

router.route('/').get(getAllTours).post(tourController.checkBody, addTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
