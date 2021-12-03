import { csvParse, DSVRowArray } from "d3-dsv";

const newlineRE = new RegExp(/\r?\n|\r/g);

const formatCSV = (
  text: string,
  nullValues: string[] = ["NA", "N/A", "NAN"],
  comment = "#"
): DSVRowArray<string> => {
  let commentRE = new RegExp(`^#.*`);
  if (typeof comment === "string" && comment !== "") {
    commentRE = new RegExp(`^${comment}.*`);
  } else {
    commentRE = new RegExp(`^#.*`);
  }
  //break it up line by line
  let lines = text.split(newlineRE);
  //trim whitespace off around lines
  lines = lines.map((line) => line.trim());
  //remove empty lines
  lines = lines.filter((line) => line && line !== "");
  //remove comments
  lines = lines.filter((line) => !line.match(commentRE));

  const formattedLines = lines.map((line) => {
    return line.split(",").map((val) => {
      //remove trailing whitespace
      val = val.trim();
      //remove NA values, make them empty strings;
      const newval: string = nullValues.includes(val) ? "" : val;
      return newval;
    });
  });
  const formattedString = formattedLines.join("\n");
  const csvData = csvParse(formattedString);
  return csvData;
};

export default formatCSV;
