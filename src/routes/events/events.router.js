const express = require('express');

const { listEvents, postNewEvent } = require('./events.controller');

const router = express.Router();

router.get('', listEvents);
router.post('', postNewEvent);

module.exports = {
  eventsRouter: router
};
