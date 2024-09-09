import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names

// Configure the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Function to upload a file to S3
export const uploadToS3 = async (file: Buffer, fileName: string, mimeType: string) => {
  const key = `${uuidv4()}-${fileName}`; // Generate a unique key for the file

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: mimeType,
    ACL: 'public-read', // Make the file publicly accessible
  });

  await s3Client.send(command);

  // Return the URL of the uploaded image
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
