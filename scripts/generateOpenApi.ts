import fs from "fs";
import path from "path";
import { generateSwaggerSpec } from "../src/config/swaggerOptions";

const specs = generateSwaggerSpec();

const outputPath = path.resolve(__dirname, "../docs/openapi.json");

fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));

console.log("OpenAPI specification generated successfully!");