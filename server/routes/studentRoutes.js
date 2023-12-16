const express = require("express");

//anything comes under /student redirected to studentRoute
//and StudentRoute redirect to Studentcontroller methods as per url hits.

const {getStudentLogin,postStudentLogin} = require("../controllers/studentController");

//Importing Routes
const router = express.Router();

router.route("/studentlogin").get(getStudentLogin);

router.route("/studentlogin").post(postStudentLogin);

module.exports=router;