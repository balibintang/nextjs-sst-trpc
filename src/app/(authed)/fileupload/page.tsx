export const dynamic = "force-dynamic";

import FileUpload from "@/app/components/FileUpload/FileUpload";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";

export default async function Home() {
  const command = new PutObjectCommand({
    ACL: "public-read-write",
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });

  const preSignUploadUrl = await getSignedUrl(new S3Client({}), command);

  return (
    <main>
      <h1 className="mb-3 text-xl font-medium">Sample file upload </h1>
      <div className="mb-3">
        This example shows a server side page that gets a pre-signed upload url
        from a server function call. It then passes that url to a client
        component to upload a file from the client side
      </div>
      <FileUpload preSignUploadUrl={preSignUploadUrl} />
      <div></div>
    </main>
  );
}
