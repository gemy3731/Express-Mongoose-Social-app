
import multer, { diskStorage } from "multer";

const uploadCloud = ()=>{
    const storage = diskStorage({})
    return multer({storage, fileFilter: filter})
}
const filter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
export default uploadCloud