import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const upload = async (req) => {
    if (req.files == null) return undefined;
    const file = req.files.photo;
    const photo = await cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) return undefined;
        return result.url;
    });
    return photo.url;
};

export default upload;
