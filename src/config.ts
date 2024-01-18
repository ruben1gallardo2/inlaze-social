import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI
  }
})