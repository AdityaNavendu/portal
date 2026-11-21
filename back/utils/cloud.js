/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import { v2 as cloudinary } from 'cloudinary';

import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,

    api_secret: process.env.CLOUD_API_SECRET || process.env.CLOUD_API_SECERT,
});


export default cloudinary;