require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_CLIENT_CERTIFICATE,
  DB_CLIENT_KEY,
  DB_SERVER_CA
} = process.env

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": 'postgres'
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host" : `/cloudsql/${DB_HOST}`,
    "dialect": 'postgres',
    "pool": {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    "dialectOptions": {
      socketPath: `/cloudsql/${DB_HOST}`,
    }
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host" : `/cloudsql/${DB_HOST}`,
    "dialect": 'postgres',
    "pool": {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    "dialectOptions": {
      socketPath: `/cloudsql/${DB_HOST}`,
    }
  }
}
