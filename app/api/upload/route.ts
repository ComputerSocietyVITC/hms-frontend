import { NextRequest, NextResponse } from "next/server";
import { Client } from "minio";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

const minioClient = new Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT || "9000"),
  useSSL: process.env.NEXT_PUBLIC_MINIO_USE_SSL === "true",
  accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY || "your_access_key",
  secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY || "your_secret_key",
});

const bucketName =
  process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME || "nextjs-uploads";

const ensureBucket = async () => {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
  }
};

const ensureTempDir = async () => {
  const tempDir = join(process.cwd(), "tmp", "uploads");
  if (!existsSync(tempDir)) {
    await mkdir(tempDir, { recursive: true });
  }
  return tempDir;
};

const validateFile = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the maximum limit of 5MB`,
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: PNG, JPEG, GIF, WEBP, SVG`,
    };
  }

  return { valid: true, error: null };
};

export async function POST(request: NextRequest) {
  let filePath = "";

  try {
    await ensureBucket();
    const tempDir = await ensureTempDir();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop() || "";
    const fileName = `${uuidv4()}.${fileExt}`;

    filePath = join(tempDir, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    await minioClient.fPutObject(bucketName, fileName, filePath, {
      "Content-Type": file.type,
    });

    await unlink(filePath);

    const fileUrl = `${fileName}`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      message: "File uploaded successfully",
    });
  } catch {
    if (filePath) {
      try {
        await unlink(filePath).catch(() => {});
      } catch {}
    }

    return NextResponse.json(
      {
        success: false,
        error: "File upload failed",
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
