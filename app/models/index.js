const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.courier = require("./courier.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.delivery_request = require("./delivery_request.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for user
db.user.hasMany(
  db.role,
  { as: "role_id" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.user.hasMany(
  db.company,
  { as: "company_id" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for courier
db.courier.hasMany(
  db.company,
  { as: "company_id" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for delivery request
db.delivery_request.hasMany(
  db.company,
  { as: "company_id" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.delivery_request.hasMany(
  db.user,
  { as: "placed_by" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.delivery_request.hasMany(
  db.courier,
  { as: "courier_id" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.delivery_request.hasMany(
  db.customer,
  { as: "customer_id" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.company.belongsTo(db.delivery_request, {
  foreignKey: 'company_id',
  as: 'company_details'
});

db.user.belongsTo(db.delivery_request, {
  foreignKey: 'placed_by',
  as: 'placed_by_details'
});

db.courier.belongsTo(db.delivery_request, {
  foreignKey: 'courier_id',
  as: 'courier_details'
});

db.customer.belongsTo(db.delivery_request, {
  foreignKey: 'customer_id',
  as: 'customer_details'
});





module.exports = db;
