const db = require('../models');
const Subscribe = db.subscribe;
const { body, validationResult } = require('express-validator');

// Create a new subscription
exports.create = [
  // Validate request body using express-validator
  body('subscription.email').isEmail().normalizeEmail(),
  body('subscription.name').notEmpty().trim(),
  body('subscription.contact').notEmpty().trim(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a subscription object
      const subscription = {
        email: req.body.subscription.email,
        name: req.body.subscription.name,
        contact: req.body.subscription.contact,
        // Add other properties as needed
      };

      // Save the subscription in the database
      const createdSubscription = await Subscribe.create(subscription);

      res.status(201).json(createdSubscription);
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ error: 'An error occurred while creating the subscription.' });
    }
  },
];

// Get a subscription by ID
exports.findById = async (req, res) => {
  const subscriptionId = req.params.id;

  try {
    const subscription = await Subscribe.findByPk(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the subscription.' });
  }
};

// Retrieve all subscriptions
exports.findAll = async (req, res) => {
  try {
    const subscriptions = await Subscribe.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error retrieving subscriptions:', error);
    res.status(500).json({ error: 'An error occurred while retrieving subscriptions.' });
  }
};
