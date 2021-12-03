const handleFilesUpload = (event) => {
  let filelist = event.target.files;
};

<input
  type="file"
  multiple={true}
  onChange={handleFilesUpload}
  accept=".csv, .xls, .xlsx, .xlsb, .ods"
/>;
