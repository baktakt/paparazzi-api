import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase.interface'
import ICaptureInput from '../../interfaces/ICaptureInput.interface'
import * as EnvironmentVariables from 'dotenv';
import * as BrowserStack from 'browserstack';

EnvironmentVariables.config({
  path: '.env'
});

const browserStackCredentials = {
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_PASSWORD
};

class CaptureController implements IControllerBase {
  public path = '/'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/capture', this.captureScreenshot)
  }

  captureScreenshot = async (req: Request, res: Response) => {
    const captureInput: ICaptureInput = req.body
    await this.browserStackCaptureScreenshot(captureInput).then(job => {
      res.send(job);
    }).catch(error => {
      res.status(503).send({ 'message': error.message });
    })
  }

  browserStackCaptureScreenshot = async (captureInput: ICaptureInput) => {
    var options = {
      url: captureInput.url,
      callback_url: captureInput.callbackUrl,
      browsers: [
        {
          os: captureInput.osName,
          os_version: captureInput.osVersion,
          browser: captureInput.name,
          browser_version: captureInput.version
        },
      ]
    };
    var screenshotClient = BrowserStack.createScreenshotClient(browserStackCredentials);
    return new Promise((resolve, reject) => {
      screenshotClient.generateScreenshots(options, function (error, job) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(job);
      });
    });
  }

}

export default CaptureController