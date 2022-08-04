const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const events = await Event.find().populate("user", "name");

  res.status(200).json({
    ok: "ok",
    message: "getEvents",
    events,
  });
};

const saveEvent = async (req, res) => {
  let event = new Event(req.body);
  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      message: "Event created",
      event: savedEvent,
    });
  } catch (error) {
    console.log("Error Created Event ", error);
    res.status(500).json({
      ok: false,
      message: "User error, contact the fucks devs",
    });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "This evento no exist",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You dont have priviligies to edit this evetn",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      message: "Event updated",
      evento: eventUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Tell to fuck dev",
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
      message: "Event deleted successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Speak with God",
    });
  }
};

module.exports = {
  getEvents,
  saveEvent,
  updateEvent,
  deleteEvent,
};
