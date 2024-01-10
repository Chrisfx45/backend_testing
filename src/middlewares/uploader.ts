import { Request } from "express";
import multer from "multer";
import { join } from "path";

type DestinationCallback = (error : Error | null, destination : string) => void;
type FileNameCallback = (error : Error | null, filename : string) => void;

export const uploader = (filePreFix : string, folderName? : string)=>{
    const defaultDir = join(__dirname, "../../public");

    const storage = multer.diskStorage({
        destination :(
            req : Request,
            file : Express.Multer.File,
            cb : DestinationCallback
        )=>{
            const destination = folderName ? defaultDir + folderName : defaultDir;
            cb(null, destination)
        },
        filename : (
            req :Request,
            file: Express.Multer.File,
            cb : FileNameCallback
        )=>{
            const originalnameParts = file.originalname.split(".");
            const fileExtension = originalnameParts[originalnameParts.length -1];
            const newFilename = filePreFix + Date.now()  +"."+ fileExtension;

            cb(null, newFilename)
        }
    })
    return multer({storage :storage})
}