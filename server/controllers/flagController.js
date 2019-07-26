/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import { House, Flag } from '../config/dbConfig';

    /**
    * @author Carlos Gringo
    * @description This Class handles user flagging house as fraudelent
    */
class Flags {
    async flagHouse(req, res) {
        const flagedHouse = await Flag.findOne({ where: { houseId: req.params.id } });
        if (flagedHouse) {
            return res.status(409).json({ status: 409, error: 'This is already flaged' });
        }
        const findHouse = await House.findOne({ where: { id: req.params.id } });
        if (!findHouse) {
            return res.status(404).json({ status: 404, error: 'House with given Id not found!' });
        }
        const payload = req.body;
        payload.houseId = req.params.id;
        const newFlag = await Flag.create(payload);
        if (newFlag) {
            res.status(201).json({
                status: 201,
                success: 'House successfully Flaged',
                data: [{
                    newFlag,
                }],
            });
        } else {
            res.status(500).json({
              status: 500,
              error: 'Server error',
            });
        }
    }
}

export default Flags;