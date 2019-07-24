/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-loop-func */
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import house from '../config/dbConfig';


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
        if (err) { console.log(err); } else {
          const imgURL = image.secure_url;
          const postedHouse = await house.House.create({
               numberofbedrooms: req.body.numberofbedrooms,
               numberoftoilets: req.body.numberoftoilets,
               price: req.body.price,
               upfront: req.body.upfront,
               district: req.body.district,
               sector: req.body.sector,
               images: imgURL,
          });
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
      console.log(error);
    }
  });
}
}

export default Houses;
