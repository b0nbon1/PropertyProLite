import date from '../utils/helpers/dates';
import PropertyModel from '../Models/PropertyModel';
import Model from '../Models/Model';
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
            await newProperty.update('properties', 'price');
            return Res.handleSuccess(200, 'successfully updated advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await Model.findOne('properties', 'status', 'available');
            return Res.handleSuccess(200, 'got all properties successfully', data, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async getOne(req, res) {
        try {
            const id = parseInt(req.params.property_id, 10);
            const [property] = await Model.findOne('properties', 'id', id);
            return Res.handleSuccess(200, 'got property successfully', property, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async specType(req, res) {
        try {
            const { type } = req.query;
            const property = await Model.findOne('properties', 'type', type);
            return Res.handleSuccess(200, 'got specific type Successful', property, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async markSold(req, res) {
        try {
            const { id } = res.locals;
            const sold = { id, status: 'sold' };
            const property = new PropertyModel(sold);
            await property.update('properties', 'status');
            return Res.handleSuccess(200, 'sold property successfully', property.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async delProperty(req, res) {
        try {
            const { id } = res.locals;
            const property = new PropertyModel({ id, table: 'properties' });
            await property.deleteOne();
            return Res.handleOk(200, 'delete property successfully', res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async report(req, res) {
        try {
            const {
                reason, description,
            } = req.body;
            // eslint-disable-next-line no-shadow
            const propertyId = parseInt(req.params.property_id, 10);
            const createdOn = date();
            const property = new PropertyModel({
                reason, description, createdOn, propertyId,
            });
            await property.report();
            return Res.handleSuccess(201, 'successfully created a report', property.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
