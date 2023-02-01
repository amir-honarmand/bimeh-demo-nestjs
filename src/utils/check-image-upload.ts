import { existsSync, unlinkSync } from "fs";
import mongoose from "mongoose";
import { join } from "path";

const BASE_URL = 'http://localhost:5000/api/v1';

export const checkImageUpload = (dto: any, image: any, path: string): any => {
    if (!image) {
        const defaultImageName: string = path + '.png';
        const imageUrl: string = `${BASE_URL}/${path}/image/${defaultImageName}`;
        dto.avatar = imageUrl;
        return dto;
    };

    const imageUrl: string = `${BASE_URL}/${path}/image/${image.filename}`;
    dto.avatar = imageUrl;
    return dto;
}


export const updatedImageUpload = (model: mongoose.Document, image: any, path: string): any => {

    removeImage(model, path, process.env.IMAGE_LOCATION);

    const imageUrl: string = `${BASE_URL}/${path}/image/${image['filename']}`;
    model['image'] = imageUrl;
    return model;
}


export const updatedAvatarUpload = (model: mongoose.Document, avatar: any, path: string): any => {

    removeImage(model, path, process.env.AVATAR_LOCATION);

    const imageUrl: string = `${BASE_URL}/${path}/image/${avatar['filename']}`;
    model['avatar'] = imageUrl;
    return model;
}


export const removeImage = (model: mongoose.Document, path: string, location: string) => {

    /* deleting image if exist / not deleting default image */
    const inputImageName = model['image'] ? model['image'].split('/')[7] : model['avatar'].split('/')[7];
    const rootDir = join(require.main.path, '..', '..');
    const imagePath = `${rootDir}${location}/${inputImageName}`;

    if (existsSync(imagePath)) {
        /* check image not default */
        if (!inputImageName.includes(path)) {
            unlinkSync(imagePath);
        };
    };
}