/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import multer from "multer";
const storage=multer.memoryStorage();
export const upload=multer({storage}).fields([
{
    name:"resume",
    maxCount:1
},
{
    name:"profilepicture",
    maxCount:1
},
{
    name:"file",
    maxCount:1
}
]);

