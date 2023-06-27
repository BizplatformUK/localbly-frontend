import { withAuth } from "./middlewares";
import multer from 'multer'
import nextConnect from "next-connect";
const crypto = require('crypto');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const account = process.env.STORAGE_ACCOUNT;
const accountKey = process.env.STORAGE_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`,sharedKeyCredential);

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 10 * 1024 * 1024},
});

apiRoute.use(upload.single('file'));

apiRoute.post(async(req, res) => {
  const session = req.user

  const {containername} = req.body;
  const containerClient = blobServiceClient.getContainerClient(containername);

  const ext = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));
  const imgName = crypto.randomBytes(4).toString('hex');
  const blobName = `${imgName}${ext}` 
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(req.file.buffer, req.file.size);
  res.status(200).json({message: "Image uploaded successfully", url: `https://${account}.blob.core.windows.net/${containername}/${blobName}`, blob:blobName,  code:0})
});

export default withAuth(apiRoute);

export const config = {
  api: {
    bodyParser: false, 
  },
};






