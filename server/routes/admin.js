const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const { Product } = require("../models/product");
const Order = require("../models/order");
const { PromiseProvider } = require("mongoose");

//add product
adminRouter.post("/admin/add-product", admin, addProduct);
//get all your products
adminRouter.get("/admin/get-products", admin, getProducts);
//delete product
adminRouter.delete("/admin/delete-product/:id", admin, deleteProduct);
//get orders
adminRouter.get("/admin/get-orders", admin, getOrders);
//change order status
adminRouter.post("/admin/change-order-status", admin, changeOrderStatus);
//analytics
adminRouter.get("/admin/analytics", admin, getAnalytics);

async function fetchCategoryWiseProduct(category) {
    let earnings = 0;
    let categoryOrders = await Order.find({
        "products.product.category": category,
    });

    for (let i = 0; i < categoryOrders.length; i++) {
       for (let j = 0; j < categoryOrders[i].length; j++) {
        earnings += categoryOrders[i].products[j].quantity * categoryOrders[i].products[j].price;
       } 
    }
    return earnings;
};

module.exports = adminRouter;