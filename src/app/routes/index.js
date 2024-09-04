const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
const AdminRouter = require('./AdminRouter')
const SecurityRouter = require("./SecurityRouter");
const CategoryRouter = require("./CategoryRouter");
const { Auth } = require("../middleware");
const { Role } = require("../constant");

router.use("/user",(req,res,next)=>Auth(req,res,next,[Role.ADMIN,Role.AUCTION_OWNER, Role.CUSTOMER]), UserRouter);
router.use("/admin",(req,res,next)=>Auth(req,res,next,[Role.ADMIN]), AdminRouter);
router.use("/security", SecurityRouter);
router.use("/category",(req, res, next) => Auth(req, res, next, [Role.AUCTION_OWNER]),CategoryRouter);

module.exports = router;
