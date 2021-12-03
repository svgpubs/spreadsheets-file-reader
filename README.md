# spreadsheets-file-reader

Accepts a FileList (`event.target.files`)
Returns ready-to-code javascript objects

- Typescript
- Supports .csv .xls .xlsx .xlsb .ods
- Dependencies: `xlsx` `d3-dsv`

```bash
npm install spreadsheets-file-reader
```

Code Snippet

```js
import SpreadsheetsFileReader from "sreadsheets-file-reader";
// ...

<input
  type="file"
  multiple={true}
  onChange={handleFilesUpload}
  accept=".csv, .xls, .xlsx, .xlsb, .ods"
/>;
```
