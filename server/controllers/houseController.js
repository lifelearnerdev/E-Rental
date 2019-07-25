/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { House } from '../config/dbConfig';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

class Houses {
  postHouse(req, res) {
    const filename = req.files.images.path;
    cloudinary.v2.uploader.upload(filename, { tags: 'E-rental' }, async (err, image) => {
      try {
        const checkHouse = await House.findOne({ where: { houseNumber: req.body.houseNumber } });
        if (checkHouse) {
          return res.status(409).json({
            status: 409,
            error: 'House number already exist',
          });
        }
        const imgURL = image.secure_url;
        const payload = req.body;
        payload.images = imgURL;
        const postedHouse = await House.create(payload);
        if (postedHouse) {
          res.status(201).json({
            status: 201,
            success: 'House successfully posted',
            data: postedHouse,
          });
        } else {
          res.status(500).json({
            status: 500,
            error: 'Server error',
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: 'Server error',
        });
      }
    });
  }
}
export default Houses;
