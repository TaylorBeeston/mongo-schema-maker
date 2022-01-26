import fs from "fs";
import util from "util";

import _ from "lodash";

const inFile = process.argv[2];
const outFile = process.argv[3];

const main = async () => {
  if (!inFile) {
    console.error("Please pass in a file!");
    return;
  }

  try {
    const data = JSON.parse((await fs.promises.readFile(inFile)).toString());

    const newData = data
      .map((d) => ({ ...d.value.types, ...d._id }))
      .reduce((acc, cur) => {
        _.set(acc, cur.key, _.omit(cur, "key"));

        return acc;
      }, {});

    if (outFile) await fs.promises.writeFile(outFile, JSON.stringify(newData));
    else console.info(util.inspect(newData, true, Infinity));
  } catch (error) {
    console.error(`Error ${error.message}`);
  }
};

await main();
