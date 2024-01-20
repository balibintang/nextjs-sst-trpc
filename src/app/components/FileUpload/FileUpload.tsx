"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const FileUpload = ({ preSignUploadUrl }: { preSignUploadUrl: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedFile) {
      const response = await fetch(preSignUploadUrl, {
        body: selectedFile,
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
          "Content-Disposition": `attachment; filename="${selectedFile.name}"`,
        },
      });
    }
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <div>
        <input
          type="file"
          className="file-input file-input-bordered file-input-accent file-input-sm mb-2 w-full max-w-xs"
          id="fileInput"
          accept="image/png, image/jpeg"
          onChange={handleFileUpload}
        />
      </div>
      <button
        className="btn btn-accent btn-sm relative z-50"
        type="submit"
        disabled={!selectedFile}
      >
        Submit
      </button>
    </form>
  );
};

export default FileUpload;
