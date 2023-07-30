const db = require("../models");
const DeliveryRequest = db.delivery_request;
const Customer = db.customer;
const User = db.user;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.getDashboard = async(req, res) => {
    try{
        const employeeCount = await getUsersCount({});
        const adminCount = await getUsersCount({ role_id: 1});
        const clerkCount = await getUsersCount({ role_id: 2});
        const deliveryBoyCount = await getUsersCount({ role_id: 3});
        const customerCount = await getCustomersCount({});
        const pendingRequestCount = await getOrdersCount({ delivery_status: "pending"});
        const progressRequestCount = await getOrdersCount({ delivery_status: "progress"});
        const deliveredRequestCount = await getOrdersCount({ delivery_status: "delivered"});
        const requestCount = pendingRequestCount+progressRequestCount+deliveredRequestCount;
        const deliveryInTimeCount = await getOrdersCount({ deliveredInTime: 1});
        const notDeliveryInTimeCount = deliveredRequestCount - deliveryInTimeCount;
        const requestAmount = await getOrdersAmount({});
        const courierBoyBonus = await getDeliveryBoyBonus();
        res.send({
            employeeCount,
            adminCount,
            clerkCount,
            deliveryBoyCount,
            customerCount,
            requestCount,
            pendingRequestCount,
            progressRequestCount,
            deliveredRequestCount,
            courierBoyBonus,
            deliveryInTimeCount,
            notDeliveryInTimeCount,
            requestAmount,
        })
    }
    catch(e) {
        res.status(500).send({
            message:
            e.message || "Some error occurred while generating report.",
        });
    }
}

async function getOrdersCount(condition) {
   return await DeliveryRequest.count({ where: condition })
}
async function getOrdersAmount(condition) {
    return await DeliveryRequest.sum('price',{ where: condition })
 }
async function getDeliveryBoyBonus() {
    const query = `
    SELECT SUM(courier_bonus) AS total_sum
    FROM delivery_requests;
    `;
    const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    });
    const totalSum = result[0].total_sum;
    return totalSum;
}
async function getUsersCount(condition) {
    return await User.count({ where: condition })
 }

 async function getCustomersCount(condition) {
    return await Customer.count({ where: condition })
 }
 