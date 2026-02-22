import multer, { diskStorage } from "multer";

const uploadCloud = ()=>{
    const storage = diskStorage({})
    return multer({storage})
}

export default uploadCloud