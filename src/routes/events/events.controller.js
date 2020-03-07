const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const eventsData = require('../../../db/events.data.json');

const listEvents = (req, res) => {
  res.status(200);
  return res.json({ data: eventsData });
};

const postNewEvent = async (req, res) => {
  const id = eventsData.length + 1;
  const newEventsData = [...eventsData, { id, ...req.body }];
  await writeFile('db/events.data.json', JSON.stringify(newEventsData));
  res.status(201);
  return res.json({
    id,
    ...req.body
  });
};

module.exports = {
  listEvents,
  postNewEvent
};
