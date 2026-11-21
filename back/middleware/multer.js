import multer from "multer";
const storage=multer.memoryStorage();
/**
 * Backend function: `upload`.
 * `upload` Express request/response ya MongoDB operation ko process karke API result deta hai.
 * Example: `upload(actual arguments);`
 */
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

