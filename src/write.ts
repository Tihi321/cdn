import { writeFile } from "fs";
import { ensureDirSync } from "fs-extra";
import { join, resolve, dirname } from "path";
const publicFolder = "./public";

export const saveToDisk = (filePath: string, jsonContent: string) => {
  const fullPath = resolve(join(publicFolder, filePath));
  ensureDirSync(dirname(fullPath));

  writeFile(fullPath, jsonContent, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");

      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
};
