const express = require("express");

//anything comes under /teacher redirected to teacherRoute
//and StudentRoute redirect to Studentcontroller methods as per url hits.

const {
    getTeacherLogin,
    postTeacherLogin,
    postTeacher,
    getTeachers,
    postStudent,
    getStudent,
    updateStudent,
    deleteStudent
    } = require("../controllers/teacherController");

const router = express.Router();

router.route("/teacherlogin").get(getTeacherLogin);

router.route("/teacherlogin").post(postTeacherLogin);

router.route("/addteacher").post(postTeacher);

router.route("/teacherdetails").get(getTeachers);

router.route("/addStudent").post(postStudent);

router.route("/studentdetails").get(getStudent);

router.route("/updateStudent/:rollno").put(updateStudent);

router.route("/deleteStudent/:rollno").delete(deleteStudent);

module.exports=router;