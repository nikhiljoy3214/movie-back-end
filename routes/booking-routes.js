var express = require("express");
var bookingController = require("../controllers/booking-controller");

var bookingsRouter = express.Router();

bookingsRouter.get("/:id", bookingController.getBookingById);
bookingsRouter.post("/", bookingController.newBooking);
bookingsRouter.delete("/:id", bookingController.deleteBooking);

bookingsRouter.get('/all/bookings', bookingController.getAllBookings);

module.exports = bookingsRouter;
