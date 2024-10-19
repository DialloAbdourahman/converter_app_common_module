import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class AwsS3Helper {
  private s3: S3Client;

  private bucketName: string;
  private bucketRegion: string;
  private accessKey: string;
  private secretKey: string;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME as string;
    this.bucketRegion = process.env.AWS_BUCKET_REGION as string;
    this.accessKey = process.env.AWS_ACCESS_KEY as string;
    this.secretKey = process.env.AWS_SECRET_KEY as string;

    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
      region: this.bucketRegion,
    });
  }

  async uploadVideo(key: string, contentType: string, file: Buffer) {
    const params = {
      Bucket: this.bucketName,
      Key: `videos/${key}`,
      Body: file,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);

    try {
      await this.s3.send(command);
      // if(data.$metadata.httpStatusCode === 200)
    } catch (error) {
      throw error;
    }
  }

  async getVideoUrl(key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `videos/${key}`,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // 1hr = 3600

    return url;
  }

  // async getVideo(key: string) {
  //   const params = {
  //     Bucket: this.bucketName,
  //     Key: `videos/${key}`,
  //   };

  //   const command = new GetObjectCommand(params);

  //   const video = await this.s3.send(command);
  // }

  async delete() {}
}
