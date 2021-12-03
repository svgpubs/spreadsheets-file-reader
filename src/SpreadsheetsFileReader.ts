import formatCSV from "./formatCSV";
import XLSX from "xlsx";
import { FileType } from "./types.js";
import { csvParse } from "d3-dsv";

export function readSpreadSheetToWorkbook(
  file: File,
  nullValues: string[],
  comment: string
): Promise<FileType> {
  const filename = file.name;
  const fileOfSheets: FileType = [];
  return new Promise<FileType>(function (resolve, reject) {
    const fr = new FileReader();
    fr.onload = function () {
      const xlsData = XLSX.read(fr.result);
      xlsData.SheetNames.forEach((sn) => {
        const csv: string = XLSX.utils.sheet_to_csv(xlsData.Sheets[sn]);
        const data = formatCSV(csv, nullValues, comment);
        fileOfSheets.push({
          sheetname: sn,
          data,
          filename,
          fail: false,
        });
      });
      resolve(fileOfSheets);
    };
    fr.onerror = function () {
      fileOfSheets.push({
        sheetname: "none",
        data: csvParse("none"),
        filename,
        fail: `${fr.error}`,
      });
      reject(fileOfSheets);
    };
    fr.readAsArrayBuffer(file);
  });
}
