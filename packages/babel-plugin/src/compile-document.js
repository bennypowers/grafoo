import fs from "fs";
import { parse, print } from "graphql";
import compress from "graphql-query-compress";
import md5Hash from "crypto-js/md5";
import path from "path";
import insertFields from "./insert-fields";
import sortDocument from "./sort-query";

let schema;
function getSchema(schemaPath) {
  if (schema) return schema;

  try {
    let fullPath;

    if (!schemaPath) {
      const schemaJson = path.join(process.cwd(), "schema.json");
      const schemaGraphql = path.join(process.cwd(), "schema.graphql");
      const schemaGql = path.join(process.cwd(), "schema.gql");

      fullPath = fs.existsSync(schemaJson)
        ? schemaJson
        : fs.existsSync(schemaGraphql)
        ? schemaGraphql
        : fs.existsSync(schemaGql)
        ? schemaGql
        : undefined;
    } else {
      fullPath = path.join(process.cwd(), schemaPath);
    }

    fs.accessSync(fullPath, fs.F_OK);

    schema = fs.readFileSync(fullPath, "utf-8");

    return schema;
  } catch (err) {
    throw err;
  }
}

export default function compileDocument(source, opts) {
  const schema = getSchema(opts.schema);
  const doc = sortDocument(insertFields(schema, parse(source), opts.idFields));
  const oprs = doc.definitions.filter(d => d.kind === "OperationDefinition");
  const frags = doc.definitions.filter(d => d.kind === "FragmentDefinition");

  if (oprs.length > 1) {
    throw new Error("@grafoo/core/tag: only one operation definition is accepted per tag.");
  }

  let grafooObj = {};

  if (oprs.length) {
    const printed = print(oprs[0]);
    const compressed = compress(printed);

    // Use compressed version to get same hash even if
    // query has different whitespaces, newlines, etc
    // Document is also sorted by "sortDocument" therefore
    // selections, fields, etc order shouldn't matter either
    if (opts.generateIds) {
      grafooObj.id = md5Hash(compressed).toString();
    }

    grafooObj.query = opts.compress ? compressed : printed;

    grafooObj.paths = oprs[0].selectionSet.selections.reduce(
      (acc, s) =>
        Object.assign(acc, {
          // TODO: generate hashes as well
          // based on compress(print(s))?
          [compress(print(s))]: {
            name: s.name.value,
            args: s.arguments.map(a => {
              if (a.value && a.value.kind === "Variable") {
                a = a.value;
              }
              return a.name.value;
            })
          }
        }),
      {}
    );
  }

  if (frags.length) {
    grafooObj.frags = {};

    for (const frag of frags) {
      grafooObj.frags[frag.name.value] = opts.compress ? compress(print(frag)) : print(frag);
    }
  }

  return grafooObj;
}
