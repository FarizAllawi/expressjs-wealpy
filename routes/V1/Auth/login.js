require('dotenv').config();

const { Users, PersonalAccessToken } = require('../../../sequelize/models');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const fs = require("fs");
const v = new Validator();

module.exports = async (req, res, next) => {

  const schema = {
    email: {type: "email"},
    password: {type: "string", min:8}
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
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: "User not found"
      });
    }

    // Decrypt user password from database
    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET_KEY);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Validate password
    if (req.body.password !== decryptedPassword) {
      return res.status(400).json({
        status: 'error',
        message: "Invalid Credentials"
      });
    }

    // Load private key from environment variable
    const privateKey = fs.readFileSync(process.env.PRIVATE_KEY);

    // Make Access Token and Refresh token
    const accessToken = jwt.sign({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }, privateKey, {
      algorithm: 'RS256',
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED
    });

    const createdPersonalAccessToken = await PersonalAccessToken.create({
      tokenableType: 'authorization-user',
      tokenableId: user.id,
      name: 'access-token',
      token: accessToken,
      abilities: null,
      lastUsedAt: null,
    })

    return res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
        accessToken: accessToken
      }
    })

  } catch(error) {
    return res.status(500).json({
      status: 'error',
      message: 'Service Unavailable'
    });
  }
}