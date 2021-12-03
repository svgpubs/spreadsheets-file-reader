import { readSpreadSheetToWorkbook } from "./SpreadsheetsFileReader";
import { FileType, FolderType } from "./types";

const csvRE = new RegExp(/.*\.csv$/);
const xlsRE = new RegExp(/.*\.xls$/);
const xlsxRE = new RegExp(/.*\.xlsx$/);
const xlsbRE = new RegExp(/.*\.xlsb$/);
const odsRE = new RegExp(/.*\.ods$/);

const saveAsSupported =
  "Accepted extensions include:\n.csv .xls .xlsx .xlsb .ods";
interface FailedType {
  filename: string;
  error: string;
}
async function SpreadSheetsFileReader(
  files: FileList,
  nullValues: string[],
  comment: string
): Promise<FolderType> {
  //initialize
  let filenames = [];
  let folder: FolderType = [];
  if (!files || files.length === 0) return folder;

  filenames = Array.from(files).map((file) => file.name);
  const fileReaders: Promise<FileType>[] = [];
  // Store promises in array
  for (let i = 0; i < files.length; i++) {
    const filename = filenames[i];
    if (
      filename.match(csvRE) ||
      filename.match(xlsxRE) ||
      filename.match(xlsbRE) ||
      filename.match(xlsRE) ||
      filename.match(odsRE)
    ) {
      fileReaders.push(
        readSpreadSheetToWorkbook(files[i], nullValues, comment)
      );
    } else {
      alert(`File Extension Not Recognized: ${saveAsSupported}`);
      return folder;
    }
  }
  folder = await Promise.all(fileReaders).then((fileCollection: FileType[]) => {
    const failed: FailedType[] = [];
    fileCollection.forEach((file) => {
      file.forEach((sheet) => {
        if (sheet.fail) {
          failed.push({ filename: sheet.filename, error: `${sheet.fail}` });
        }
      });
      folder.push(file);
    });
    folder.forEach((file) =>
      file.forEach((sheet) => {
        delete sheet.fail;
      })
    );
    if (failed.length) {
      const failErrorMessages = failed
        .map((f) => `\tERROR reading ${f.filename}:\t${f.error}`)
        .join("\n");
      throw Error(`spreadsheets-reader ERROR:\n ${failErrorMessages}`);
    }
    return folder;
  });
  return folder;
}

export default SpreadSheetsFileReader;
