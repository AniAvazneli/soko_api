import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerMiddleware = () => {
  const options = {
    customCss: ".swagger-ui .topbar {display:none}",
    customeSiteTitle: "SOKO",
  };

  const swaggerDocument = YAML.load("./src/config/swagger.yaml");
  return [swaggerUI.serve, swaggerUI.setup(swaggerDocument, options)];
};

export default swaggerMiddleware;
