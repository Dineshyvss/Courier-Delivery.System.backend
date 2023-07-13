const db = require("../models");
const DeliveryRequest = db.delivery_request;
const Op = db.Sequelize.Op;

// Create and Save a new DeliveryRequest
exports.create = (req, res) => {
  // Validate request
  if (req.body.pickup_address === undefined) {
    const error = new Error("pickup_address cannot be empty for delivery_request!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.delivery_address === undefined) {
    const error = new Error("delivery_address cannot be empty for delivery_request!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.delivery_date_time === undefined) {
    const error = new Error("delivery_date_time cannot be empty for delivery_request!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.price === undefined) {
    const error = new Error("price cannot be empty for delivery_request!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.average_time === undefined) {
    const error = new Error("average_time cannot be empty for delivery_request!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.distance === undefined) {
    const error = new Error("distance cannot be empty for delivery_request!");
    error.statusCode = 400;
    throw error;
  }

  req.body.delivery_status = req.body.delivery_status || "pending"
  
  // Save DeliveryRequest in the database
  DeliveryRequest.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DeliveryRequest.",
      });
    });
};

// Retrieve all DeliveryRequests from the database.
exports.findAll = (req, res) => {
  const deliveryRequestId = req.query.deliveryRequestId;
  var condition = deliveryRequestId
    ? {
        id: {
          [Op.like]: `%${deliveryRequestId}%`,
        },
      }
    : null;

  DeliveryRequest.findAll({ where: condition, order: [["id", "DESC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving delivery_requests.",
      });
    });
};

// Find a single DeliveryRequest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DeliveryRequest.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving DeliveryRequest with id=" + id,
      });
    });
};

// Update a DeliveryRequest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DeliveryRequest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DeliveryRequest was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update DeliveryRequest with id=${id}. Maybe DeliveryRequest was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating DeliveryRequest with id=" + id,
      });
    });
};

// Delete a DeliveryRequest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DeliveryRequest.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "DeliveryRequest was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete DeliveryRequest with id=${id}. Maybe DeliveryRequest was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete DeliveryRequest with id=" + id,
      });
    });
};

// Delete all DeliveryRequests from the database.
exports.deleteAll = (req, res) => {
  DeliveryRequest.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} DeliveryRequests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all delivery_requests.",
      });
    });
};
