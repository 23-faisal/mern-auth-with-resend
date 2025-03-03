import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    success: true,
    message: "Hello World!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
