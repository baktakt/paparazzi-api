import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'
import CaptureController from './controllers/capture/Capture.controller'

const app = new App({
  port: process.env.PORT || 3000,
  controllers: [
    new CaptureController()
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
})

app.listen()