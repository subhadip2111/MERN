const usermodel = require("../Models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {
  validPhone,
  validPasswod,
  validEmail,
} = require("../validations/validator");
const registerUser = async function (req, res) {
  try {
    const user_Data = req.body;
    const { name, email, password, mobile } = user_Data;
    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "please Enterd your name" });
    }
    if (!email ) {
      return res
        .status(400)
        .json({ status: false, message: "please Enterd your email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: false, message: "please Enterd your password" });
    }
    if (!mobile || mobile == undefined) {
      return res
        .status(400)
        .json({ status: false, message: "please Enterd your mobile" });
      }
      

 if (!validEmail(email)) {
   return res.status(400).json({
     status: false,
     message: "Invalid email Address  Please Check It ",
   });
 }

      
      if (!validPasswod(password)) {
        return res.status(400).json({
          status: false,
          message: "Invalid password  Please Check It ",
        });
      }

    if (!validPhone(mobile)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Mobile Number Please Check It " });
    }

  let  findUser=await usermodel.findOne({email:email})
    if (findUser) {
  return res.status(200).json({success:true,data:findUser})
    }
    

    const hashPassword = await bcrypt.hash(password, 10)
    user_Data.password=hashPassword
    const savedData = await usermodel.create(user_Data);
    return res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    console.log("err is ", error);
  }
};


const loginUser = async function (req, res) {
  try {
    let requestBody = req.body;
    const { email, password } = requestBody;
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is  required" });
    if (!validEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "email is incorrect" });

    if (!password)
     { return res
       .status(400)
       .send({ status: false, message: "password is required" });
    }
      if (!validPasswod(password)) {
        return res.status(400).json({
          status: false,
          message: "Invalid password  Please Check It ",
        });
      }
    let userLogin = await usermodel.findOne({ email: email });
    if (!userLogin)
      return res.status(404).send({ status: false, message: "Not found" });
    let checkPassword = await bcrypt.compare(password, userLogin.password);
    if (!checkPassword)
      return res
        .status(404)
        .send({ status: false, message: "Password not valid" });

    let token = jwt.sign(
      {
        userId: userLogin._id,
      },
      "subhadip",
      { expiresIn: "24h" }
    );
    res.setHeader("Authorization", token);
    return res
      .status(200)
      .send({
        status: true,
        message: "User loged in successfully",
        data: token,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports={registerUser,loginUser}