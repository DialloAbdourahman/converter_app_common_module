import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PassThrough } from "stream";
import { spawn } from "child_process";
import { generateRandomString } from "../utils/generateRandomString";

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
    } catch (error) {
      throw error;
    }
  }

  async uploadAudio(key: string, mp3Stream: PassThrough) {
    const params = {
      Bucket: this.bucketName,
      Key: `videos/${key}`,
      Body: mp3Stream,
    };

    const command = new PutObjectCommand(params);

    try {
      await this.s3.send(command);
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

  async getVideoStreamFromS3(
    key: string
  ): Promise<NodeJS.ReadableStream | undefined> {
    const params = {
      Bucket: this.bucketName,
      Key: `videos/${key}`,
    };

    const command = new GetObjectCommand(params);

    const video = await this.s3.send(command);

    return video.Body as NodeJS.ReadableStream;
  }

  async convertVideoToMp3(key: string) {
    try {
      const videoStream = await this.getVideoStreamFromS3(key);

      const mp3Stream = new PassThrough();

      // Use `spawn` to convert the video stream to MP3 using ffmpeg
      const ffmpegProcess = spawn("ffmpeg", [
        "-i",
        "pipe:0", // Input from stdin (video stream)
        "-q:a",
        "0", // Best audio quality
        "-map",
        "a", // Extract only audio
        "-f",
        "mp3", // Output format MP3
        "pipe:1", // Output to stdout (so it can be piped)
      ]);

      videoStream?.pipe(ffmpegProcess.stdin);

      ffmpegProcess.stdout.pipe(mp3Stream);

      const s3key = generateRandomString(10);
      await this.uploadAudio(s3key, mp3Stream);

      ffmpegProcess.on("close", (code) => {
        if (code === 0) {
          console.log("ffmpeg finished successfully");
        } else {
          console.log(`ffmpeg process exited with code ${code}`);
        }
      });

      ffmpegProcess.stderr.on("data", (data) => {
        console.error(`ffmpeg error: ${data}`);
      });
    } catch (error) {
      console.error("Error converting video to MP3:", error);
    }
  }

  async delete() {}
}
