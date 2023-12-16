const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//teacherSchema in DB .................
const teacherSchema= mongoose.Schema(
{
    teacherId: {
        type: String,
        required: [true,"Please Enter Your Id"]
    },
    password: {
        type: String,
        required: [true,"Please Enter Your Password"],
    },
}
);
teacherSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                teacherId: this.teacherId,
                password: this.password,
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

module.exports = mongoose.model("teachers_details",teacherSchema);