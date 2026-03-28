import "dotenv/config";
import fs from "fs";
import path from "path";
import { openApiSpec } from "../src/config/swagger";

const docsDir = path.resolve(process.cwd(), "docs");
const outputPath = path.join(docsDir, "openapi.json");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(openApiSpec, null, 2), "utf-8");
console.log(`OpenAPI spec generated at ${outputPath}`);
