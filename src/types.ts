import { DSVRowArray } from "d3-dsv";

interface SheetType {
  filename: string;
  sheetname: string;
  data: DSVRowArray<string>;
  fail?: boolean | string;
}

type FileType = SheetType[];
type FolderType = FileType[];

export { SheetType, FileType, FolderType };
