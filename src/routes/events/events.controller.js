const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const { validationResult } = require('express-validator');
const eventsData = require('../../../db/events.data.json');

const listEvents = (req, res) => {
  res.status(200);
  return res.json({ data: eventsData });
};

const postNewEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.empty) {
    return res.status(422).json({ errors: errors.array() });
  }
  const id = eventsData.length + 1;
  const newEventsData = [...eventsData, { id, ...req.body }];
  await writeFile('db/events.data.json', JSON.stringify(newEventsData));
  res.status(201);

  return res.json({
    id,
    ...req.body
  });
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const updatedEventsData = eventsData.map(event => {
    if (event.id == id) {
      return {
        ...event,
        ...req.body
      };
    }
    return event;
  });

  await writeFile('db/events.data.json', JSON.stringify(updatedEventsData));
  res.status(200);
  return res.json({
    id
  });
};

module.exports = {
  listEvents,
  postNewEvent,
  updateEvent
};
