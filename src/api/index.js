const express = require("express");

const { healthRouter } = require('../routes/health/health.router')
const { eventsRouter} = require('../routes/events/events.router')

const router = express.Router();
router.use("/health", healthRouter);
router.use("/events", eventsRouter)

module.exports = router;
