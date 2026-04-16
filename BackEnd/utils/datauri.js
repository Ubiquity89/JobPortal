//for generating uri for the file which user uploads
import DatauriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) return null;
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
