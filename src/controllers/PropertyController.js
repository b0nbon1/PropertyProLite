
import date from '../utils/helpers/dates';
import PropertyModel from '../Models/PropertyModel';
import Res from '../utils/helpers/responses';
import upload from '../utils/helpers/upload';

const status = 'available';

export default class Property {
    static async Post(req, res) {
        try {
            const {
                state, city, address, type,
            } = req.body;
            const { price } = res.locals;
            const imageUrl = await upload(req);
            const owner = res.locals.user.id;
            const createdOn = date();
            const newProperty = new PropertyModel({
                status, owner, price, state, city, address, type, imageUrl, createdOn,
            });
            await newProperty.post();
            return Res.handleSuccess(201, 'successfully created an advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async Update(req, res) {
        try {
            const {
                price,
            } = req.body;
            const id = parseInt(req.params.property_id, 10);
            const newProperty = new PropertyModel({ id, price });
            await newProperty.update();
            return Res.handleSuccess(200, 'successfully updated advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}