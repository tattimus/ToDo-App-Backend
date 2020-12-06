require('dotenv').config()

const { PORT } = process.env
const { APPLICATION_STAGE } = process.env
const { NODE_ENV } = process.env

let MONGODB_URI
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else {
  MONGODB_URI = process.env.MONGODB_URI
}


module.exports = {
  PORT,
  MONGODB_URI,
  APPLICATION_STAGE,
  NODE_ENV,
}
