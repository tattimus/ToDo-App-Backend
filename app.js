const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const itemRouter = require('./controllers/itemRouter')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()
mongoose.set('useFindAndModify', false)

// Development stage (local) database connector
if (config.APPLICATION_STAGE === 'DEV') {
  logger.info('Connecting to', config.MONGODB_URI)

  mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info('Connection successful')
    })
    .catch((error) => {
      logger.error('Error in connection to MongoDB:', error.message)
    })
}

// Production stage (heroku e.g.) database connector
if (config.APPLICATION_STAGE === 'PROD') {
  logger.info('Connecting to prod DB')
}


app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/item', itemRouter)

app.get('*', (req, res) => {
  res.send('<h1>Bäkki päällä</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
