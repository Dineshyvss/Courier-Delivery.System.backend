module.exports = (app) => {
  const DeliveryRequest = require("../controllers/delivery_request.controller.js");
  var router = require("express").Router();

  // Create a new DeliveryRequest
  router.post("/deliveryrequests/",  DeliveryRequest.create);

  // Retrieve all deliveryrequests placed by user
  // router.get(
  //   "/deliveryrequests/user/:userId",
  //   Courier.findAllForUser
  // );

  // // Retrieve all deliveryrequests for company
  // router.get(
  //   "/deliveryrequests/company/:companyId",
  //   Courier.findAllForCompany
  // );

  // // Retrieve all deliveryrequests for customer
  // router.get(
  // "/deliveryrequests/customer/:customerId",
  // Courier.findAllForCustomer
  // );

  // // Retrieve all deliveryrequests assigned to courier
  //   router.get(
  //   "/deliveryrequests/courier/:courierId",
  //   Courier.findAllForCourier
  // );
  
  // Retrieve all deliveryrequests
  router.get("/deliveryrequests/", DeliveryRequest.findAll);

  // Retrieve a single DeliveryRequest with id
  router.get("/deliveryrequests/:id", DeliveryRequest.findOne);

  // Update a DeliveryRequest with id
  router.put("/deliveryrequests/:id", DeliveryRequest.update);

  // Delete a DeliveryRequest with id
  router.delete("/deliveryrequests/:id",DeliveryRequest.delete);

  // Delete all deliveryrequests
  router.delete("/deliveryrequests/", DeliveryRequest.deleteAll);

  app.use(router);
};

