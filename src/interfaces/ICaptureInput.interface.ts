import IBrowser from "./IBrowser.interface";

interface ICaptureInput {
  url: string
  callback_url: string
  browsers: [IBrowser]
}

export default ICaptureInput