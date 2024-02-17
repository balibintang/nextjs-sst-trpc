export const dynamic = "force-dynamic";

import FileUpload from "@/app/components/FileUpload/FileUpload";
import { createApiCaller } from "@/app/utils/trpc/server";

export default async function Home() {
  const api = createApiCaller();
  const preSignUploadUrl = await api.user.getS3UploadUrl.fetch();

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
