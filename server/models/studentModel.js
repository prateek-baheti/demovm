const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//StudentSchema for DB...............
const studentSchema= mongoose.Schema(
{
    rollno: {
        type: String,
        required: [true,"Please Student Rollno."]
    },
    name: {
        type: String,
        required: [true,"Please Enter Student Name"],
    },
    dob: {
        type: String,
        required: [true,"Please Enter Student Date-of-Birth"],
    },
    score: {
        type: Number,
        required: [true,"Please Enter Student Overall_Score"],
    },
}
);

studentSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                rollno: this.rollno,
                dob: this.dob,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );
    } catch (error) {
        console.error(error);
    }
}

module.exports = mongoose.model("student_details",studentSchema);