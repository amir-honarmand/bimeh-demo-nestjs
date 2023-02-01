import { InternalServerErrorException } from "@nestjs/common";

export const editImageName = (req: any, file: any, cb: any): any=>{
    try {
        const splitImageType: [] = file.originalname.split('.');
        const typeImage: string = splitImageType[splitImageType.length-1];
        let uniqueName: string = new Date().getTime().toString() + Math.random().toString();
        uniqueName = uniqueName.replace('.', '_');
        const imageName: string = `${uniqueName}.${typeImage}`;
    
        cb(null, imageName);
        
    } catch (err) {
        cb(new InternalServerErrorException('upload image error =>' + err.message));
    };
}