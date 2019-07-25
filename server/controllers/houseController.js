/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
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
        if (!err) {
          const imgURL = image.secure_url;
          const payload = req.body;
          payload.images = imgURL;
          const postedHouse = await House.create(payload);
          if (postedHouse) {
            res.status(201).json({
              status: 201,
              success: 'House successfully posted',
              data: [{
                postedHouse,
              }],
            });
          } else {
            res.status(500).json({
              status: 500,
              error: 'Server error',
            });
          }
        }
      } catch (error) {
       return res.status(500).json({
        status: 500,
        error: `${error}`,
      });
  }
});
   }
}
export default Houses;
