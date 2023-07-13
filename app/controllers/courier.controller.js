const db = require("../models");
const Courier = db.courier;
const Op = db.Sequelize.Op;

// Create and Save a new Courier
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("name cannot be empty for courier!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.email === undefined) {
    const error = new Error("email cannot be empty for courier!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.contact === undefined) {
    const error = new Error("contact cannot be empty for courier!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.company_id === undefined) {
    const error = new Error("company_id cannot be empty for courier!");
    error.statusCode = 400;
    throw error;
  } 

  // Save Courier in the database
  Courier.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Courier.",
      });
    });
};

// Retrieve all Couriers from the database.
exports.findAll = (req, res) => {
  const courierId = req.query.courierId;
  var condition = courierId
    ? {
        id: {
          [Op.like]: `%${courierId}%`,
        },
      }
    : null;

  Courier.findAll({ where: condition, order: [["id", "DESC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving couriers.",
      });
    });
};

// Find a single Courier with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Courier.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Courier with id=" + id,
      });
    });
};

// Update a Courier by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Courier.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Courier was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Courier with id=${id}. Maybe Courier was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Courier with id=" + id,
      });
    });
};

// Delete a Courier with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Courier.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Courier was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Courier with id=${id}. Maybe Courier was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Courier with id=" + id,
      });
    });
};

// Delete all Couriers from the database.
exports.deleteAll = (req, res) => {
  Courier.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Couriers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all couriers.",
      });
    });
};
