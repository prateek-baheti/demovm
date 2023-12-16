const student_details = require("../models/studentModel");
const jwt = require("jsonwebtoken");
//@desc get Student login page
//@route Get /student/studentLogin
//@access public 
const getStudentLogin =(req,res) => {
    res.status(200).json({message : "hey student!!"});
};

//@desc post Student login details for authentication
//@route Post /student/studentLogin
//@access public 
const postStudentLogin = async (req,res) => {
    console.log("The Request Body for Student Login is :",req.body);
    const{rollno,dob}=req.body;
    if (!rollno || !dob) {
        //if any_one or both fields are NULL passed in RequestBody
        res.status(400);
        throw new Error("All Fields are MANDATORY !!");
    }
    else{
        //Check if student is present in DB
        const student = await student_details.findOne({ rollno });
        console.log(student);
 

        //IF THERE......
        if (student) 
        {
            //Check if passed correct DOB or not.
            if(student.dob != dob){
                res.status(401).json({message : "Inavlid rollno and dob Please Try with correct credentials..."});
                return;
            }
            res.status(200).json({
                message : "Login Successful", 
                token: await student.generateToken(),
                userId: student._id.toString(),
                studentdetails: student,
            });
        } 
        else 
        {
            //IF NOT.......
            res.status(404).json({message:"Invalid Rollno and dob"});
        }
    }
};
module.exports ={
    getStudentLogin,
    postStudentLogin,
};