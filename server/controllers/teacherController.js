const teachers_details = require("../models/teacherModel");
const student_details = require("../models/studentModel");
const bcrypt = require("bcryptjs");

//Finding in student DB according to Query
student_details.findBy = async function(query) {
    const student= await this.find(query);
    return student;
}

//Finding in teacher DB according to Query
teachers_details.findBy = async function(query) {
    const teacher= await this.find(query);
    return teacher;
}

//@desc get teacher login page
//@route Get /teacher/teacherlogin
//@access public 
const getTeacherLogin =(req,res) => {
    res.status(200).json({message : "hey techer!!"});
};

//@desc post teacher login details for authentication
//@route Post /teacher/teacherlogin
//@access public 
const postTeacherLogin = async (req,res) => {
    console.log("The Request Body for Teacher Login is :",req.body);
    const{teacherId,password}=req.body;
    console.log(teacherId,password);
    if (!teacherId || !password) {
        res.status(400).json("All fields are Mandatory!!");
    }
    else{
        const teacher = await teachers_details.findOne({ teacherId });
        if(!teacher){
            res.status(404).json({message : "Invalid Credentials Please Try Again..."});
            return;
        }
        if ( teacher && await bcrypt.compare(password,teacher.password) ) 
        {
            res.status(200).json({
                message : "Login Successful", 
                token: await teacher.generateToken(),
                userId: teacher._id.toString(),});
        } 
        else 
        {
            res.status(404).json({message:"Invalid passwd"});
        }
    }
};

//@desc get all teacher from DB
//@route Get /teacher/teacherdetails
//@access public 
const getTeachers = async (req,res) =>{
    const teachers = await teachers_details.find();
    res.status(200).json(teachers);
};

//@desc post adding Teachers
//@route Post /teacher/addteacher
//@access public 
const postTeacher = async (req,res) => 
{
    console.log("The Request Body for Teacher is :", req.body );
    const{teacherId,password}=req.body;
    const alreadyCreated = await teachers_details.findOne({teacherId});
    if(alreadyCreated){
        res.status(403).json({message : "teacher id is already present in DB"});
    }
    else{
    if (Object.entries(teacherId).length==0 || Object.entries(password).length==0) {
        res.status(400);
        throw new Error("All Fields are MANDATORY !!");
    }
    const hashpasswd = await bcrypt.hash(password,10);
    console.log("Hash password :",hashpasswd);
    const teacher = await teachers_details.create({
        teacherId,
        password: hashpasswd,
    });
    if(teacher){
        res.status(201).json({
            message : "Registration Successful", 
            token: await teacher.generateToken(),
            userId: teacher._id.toString(),});
    }
    else{
        res.status(500).json({issue : "Something went wrong please try after sometime!!"})
    }
    }
};

//@desc get all students from DB
//@route get /teacher/studentdetails
//@access public 
const getStudent = async (req,res) =>{
    const students = await student_details.find();
    res.status(200).json(students);
};

//@desc post Adding Student in DB
//@route Post /teacher/addStudent
//@access public 
const postStudent = async (req,res) => 
{
    console.log("The Request Body for Students is :", req.body );
    const{rollno,name,dob,score}=req.body;
    if (!rollno || !name || !dob || !score) {
        res.status(400);
        throw new Error("All Fields are MANDATORY !!");
    }
    const alreadystudent = await student_details.findOne({rollno});
    if(alreadystudent){
        res.status(409).json({message: "Roll Number is already present in DB ..."});
        return;
    }

    const student = await student_details.create({
        rollno,
        name,
        dob,
        score,
    });
    res.status(201).json({
        message : "Registration Successful", 
        token: await student.generateToken(),
        userId: student._id.toString(),
    });
};

//@desc put Update Student in DB
//@route Put /teacher/updateStudent/:rollno
//@access public 
const updateStudent = async (req, res) =>{
    console.log("The Request Body for Students is :", req.body );
    const rollno= req.params.rollno;
    const student = await student_details.findOne({rollno});
    if (!student) {
        res.status(404).json(("Not a valid rollno"));
    } else {
    const updateStudentDetail= await student_details.findByIdAndUpdate(
        student._id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateStudentDetail);
    }   
};

//@desc delete Student in DB
//@route Delete /teacher/deleteStudent/:rollno
//@access public 
const deleteStudent = async (req, res) =>{
    const rollno= req.params.rollno;
    const student = await student_details.findBy({rollno : rollno});
    if (Object.entries(student).length == 0) {
        res.status(404);
        throw new Error("Not a valid rollno");
    } else {
    const deleteStudentDetail= await student_details.findByIdAndDelete(
        student[0]._id);
    res.status(200).json(deleteStudentDetail);
    }   
};

module.exports ={
    getTeacherLogin,
    postTeacherLogin,
    postTeacher,
    getTeachers,
    postStudent,
    getStudent,
    updateStudent,
    deleteStudent
};