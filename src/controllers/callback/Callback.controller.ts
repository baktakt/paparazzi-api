import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase.interface'

class CallbackController implements IControllerBase {
  public path = '/callback'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post(this.path + '/', this.screenshotCallback)
  }

  screenshotCallback = async (req: Request, res: Response) => {
    const callbackInput = req.body
    console.log(callbackInput);
    res.status(200).send();
  }

}

export default CallbackController