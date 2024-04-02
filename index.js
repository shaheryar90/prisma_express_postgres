const express = require("express");
const { PrismaClient } = require("@prisma/client");
const swaggerJsdoc = require("swagger-jsdoc");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/public", express.static("public"));

require("./startup/routes")(app);
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/dev/practice_project/api/v1",
      },
    ],
  },
  apis: ["./routes/authFile.js", "./routes/userFile.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 3001;
//For Dev http

app.listen(port, () =>
  console.log(
    `Listening on port: ${port}, and the environment is: $"{process.env.NODE_ENV"}`
  )
);
