const app = require("./app");
const { port } = require("./config/config");

if (!port) {
  throw new Error("PORT is not defined in environment variables.");
}

app.listen(port, () => {
  console.log(`Jflix backend running on http://localhost:${port}`);
});
