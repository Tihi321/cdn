import { writeFile } from "fs";
import { ensureDirSync } from "fs-extra";
import { join, resolve, dirname } from "path";
const publicFolder = "./public";

export const saveToDisk = (filePath: string, jsonContent: string) => {
  const fullPath = resolve(join(publicFolder, filePath));
  ensureDirSync(dirname(fullPath));

  writeFile(fullPath, jsonContent, "utf-8", (err) => {
    if (err) {
      console.log(`An error occured while writing ${filePath}.`);

      return console.log(err);
    }

    console.log(`${filePath} has been saved.`);
  });
};
