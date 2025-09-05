export async function uploadToS3(file: File) {
  const res = await fetch(
    `/api/s3-upload-url?fileName=${file.name}&fileType=${file.type}`
  );
  const { url } = await res.json();

  const upload = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!upload.ok) throw new Error("Upload failed");
  return url.split("?")[0];
}
