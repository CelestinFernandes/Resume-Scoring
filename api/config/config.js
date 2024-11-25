// File: config/config.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['application/pdf']
};