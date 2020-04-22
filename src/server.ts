import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'
import CaptureController from './controllers/capture/Capture.controller'
import CallbackController from './controllers/callback/Callback.controller'

const app = new App({
  port: process.env.PORT || 3000,
  controllers: [
    new CaptureController(),
    new CallbackController()

  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
})

app.listen()