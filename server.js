const express = require("express");
const connectToDb = require("./config/connectToDB");
const { errorHandler, notFound } = require("./middlewares/error");
require("dotenv").config();
const cors = require("cors");
const https = require("https");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// Connection To Db
connectToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Cors Policy
app.use(
  cors({
    origin: "*",
  })
);

// https
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

const serverSec = https.createServer(options, app);

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Atmetha Backend",
      version: "1.0.0",
      description: "This Api's for Atmetha backend",
    },
    security: [{ bearerAuth: [] }],
    servers: [
      { url: "https://localhost:8000/" },
      { url: "https://44.204.85.191:8000" },
    ],
  },
  // apis: ["./routes/*.js"], // Path to the API routes directory
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  apis: ["./swagger.js"], // Path to the API routes directory
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/centers", require("./routes/centerRoute"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/lessons", require("./routes/lessonRoute"));
app.use("/api/units", require("./routes/unitRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/message", require("./routes/messageRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/codes", require("./routes/codesRoute"));
app.use("/api/sides", require("./routes/sidesRoute"));
app.use("/api/subjects", require("./routes/subjectsRoute"));
app.use("/api/notifications", require("./routes/notificationsRoute"));
app.use("/api/exam", require("./routes/examRoute"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Start the Express server
const PORT = process.env.PORT || 8000;
serverSec.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
