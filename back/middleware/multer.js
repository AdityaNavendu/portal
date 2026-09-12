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

