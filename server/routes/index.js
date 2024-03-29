var express = require('express');
var router = express.Router();

module.exports = function (io) {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Alert Chat App' });
  });

  router.post('/alert-room1', function (req, res, next) {
    let message = initialMessage(req.body.message, "ALERT ROOM 1")
    // console.log("req.body room 1 : ")
    // console.log(req.body)
    io.to("room1").emit("receiveMessage", { room: "room1", message })
    res.json({ status: "ok", message: "alert room 1 sended" })
  });

  router.post('/alert-room2', function (req, res, next) {
    let message = initialMessage(req.body.message, "ALERT ROOM 2")
    // console.log("req.body room 2 : ")
    // console.log(req.body)
    io.to("room2").emit("receiveMessage", { room: "room2", message })
    res.json({ status: "ok", message: "alert room 2 sended" })
  });

  router.post('/alert-all-room', function (req, res, next) {
    let message = initialMessage(req.body.message, "ALERT ALL ROOM")
    // console.log("req.body all room: ")
    // console.log(req.body)
    io.to("room1").emit("receiveMessage", { room: "room1", message })
    io.to("room2").emit("receiveMessage", { room: "room2", message })
    res.json({ status: "ok", message: "alert all room sended" })
  });

  return router;
};


function initialMessage(message, defaultMessage) {

  if (message) {
    return message;
  }

  return defaultMessage
}