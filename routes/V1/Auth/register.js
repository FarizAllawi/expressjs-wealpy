require('dotenv').config()


const { Users } = require('../../../sequelize/models');
const Validator = require('fastest-validator');
const CrytoJS = require("crypto-js");
const v = new Validator();

module.exports = async (req, res, next) => {

  const schema = {
    email: {type: "email"},
    firstName: {type: "string", min: "3"},
    lastName: {type: "string", min: 3},
    password: {type: "string", min: 8},
  }

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  try {
    // Is user exists
    const email = await Users.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (email) {
      return res.status(400).json({
        status: 'error',
        message: "email already exists"
      });
    }

    const username = req.body.email.split('@')[0];
    const findUsername = await Users.findOne({
      where: {
        username: username,
      }
    });

    if (findUsername) {
      return res.status(400).json({
        status: 'error',
        message: "username already exists"
      });
    }

    const password  = CrytoJS.AES.encrypt(req.body.password, process.env.AES_SECRET_KEY).toString();

    // Create Users if no error present
    const createdUsers = await Users.create({
      name : `${req.body.firstName} ${req.body.lastName}`,
      username: username,
      email: req.body.email,
      password: password,
    });

    return res.json({
      status: 'success',
      data: createdUsers
    })


  } catch (error) {

    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Service Unavailable'
    });
  }
}