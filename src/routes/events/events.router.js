const express = require('express');
const { check } = require('express-validator');

const {
  listEvents,
  postNewEvent,
  updateEvent,
  deleteEvent
} = require('./events.controller');
const { validateBody } = require('../../middleware/validate-body');

const router = express.Router();

router.get('', listEvents);

router.post(
  '',
  [
    check('name')
      .not()
      .isEmpty(),
    check('description')
      .not()
      .isEmpty(),
    check('location')
      .not()
      .isEmpty()
  ],
  validateBody,
  postNewEvent
);

router.put(
  '/:id',
  [
    check('name')
      .optional()
      .not()
      .isEmpty(),
    check('description')
      .optional()
      .not()
      .isEmpty(),
    check('location')
      .optional()
      .not()
      .isEmpty()
  ],
  validateBody,
  updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = {
  eventsRouter: router
};
