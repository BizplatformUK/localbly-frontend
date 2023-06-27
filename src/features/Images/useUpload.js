
import AWS from 'aws-sdk';
import { useCallback } from 'react';
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.NEXT_PUBLIC_SECRET,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET
});
export default function uploadFile(blob){
    const params = { Body: blob, 
                     Bucket: 'konectify', 
                     Key: 'konectify/cms'+ blob.name};
     // Sending the file to the Spaces
     const url = 'https://konectify.sgp1.digitaloceanspaces.com/';
     s3.putObject(params)
     .on('build', request => {
       request.httpRequest.headers.Host = url ;
       request.httpRequest.headers['Content-Length'] = blob.size;
       request.httpRequest.headers['Content-Type'] = blob.type;
       request.httpRequest.headers['x-amz-acl'] = 'public-read';
    })
    
}
