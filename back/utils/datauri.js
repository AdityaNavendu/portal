import path from "path";



/**
 * Backend function: `getdatauri`.
 * Uploaded file ke buffer aur MIME type se Cloudinary-compatible data URI string banata hai.
 * Example: `getdatauri(actual arguments);`
 */
const getdatauri = async (file) => {
  if (!file?.buffer) return null;

    const originalName = file.originalname ?? "upload";
    const ext = path.extname(originalName).slice(1).toLowerCase();

    const mimeMap = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    pdf: "application/pdf",
  };

    const mimeType = mimeMap[ext] || "application/octet-stream";
    const base64 = file.buffer.toString("base64");

  return {
    contentType: mimeType,
    base64,
    dataUri: `data:${mimeType};base64,${base64}`,
  };
};

export default getdatauri;





