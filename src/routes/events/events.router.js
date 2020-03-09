const express = require('express');
const { check } = require('express-validator');

const events = require('./events.controller');
const { validateBody } = require('../../middleware/validate-body');

const router = express.Router();

router.get('', events.get);

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
  events.post
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
  events.update
);

router.delete('/:id', events.remove);

module.exports = {
  eventsRouter: router
};
