import path from "node:path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load(
  path.resolve("api", "swagger.yaml"),
);

export { swaggerUi, swaggerDocument };
