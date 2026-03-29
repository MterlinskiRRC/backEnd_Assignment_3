import app from "./app";

// Use environment variables from app.ts where dotenv is loaded
const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});