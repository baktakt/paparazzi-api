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
  public path = '/capture'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post(this.path + '/', this.captureScreenshot)
    this.router.get(this.path + '/:id', this.getJob)
  }

  captureScreenshot = async (req: Request, res: Response) => {
    const captureInput: ICaptureInput = req.body
    await this.browserStackCaptureScreenshot(captureInput).then(job => {
      res.send(job);
    }).catch(error => {
      res.status(503).send({ 'message': error.message });
    })
  }

  getJob = (req: Request, res: Response) => {
    const id = req.params.id
    var screenshotClient = BrowserStack.createScreenshotClient(browserStackCredentials);
    screenshotClient.getJob(id, (error, job) => {
      if (error) {
        res.status(404).send({ 'message': error.message })
      }
      res.send(job);
    })
  }

  browserStackCaptureScreenshot = async (captureInput: ICaptureInput) => {
    var screenshotClient = BrowserStack.createScreenshotClient(browserStackCredentials);
    return new Promise((resolve, reject) => {
      screenshotClient.generateScreenshots(captureInput, function (error, job) {
        if (error) {
          reject(error);
        }
        resolve(job);
      });
    });
  }

}

export default CaptureController