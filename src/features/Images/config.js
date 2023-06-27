import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.NEXT_PUBLIC_SECRET,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET
    });
export default s3;