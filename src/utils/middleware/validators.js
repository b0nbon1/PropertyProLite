import Res from '../helpers/responses';
import Regex from '../helpers/Regexes';
import Model from '../../Models/Model';
import Advert from '../../Models/PropertyModel';

export default class Validations {
    static async user(req, res, next) {
        try {
            const {
                firstname,
                lastname,
                address,
                email,
                phoneNumber,
                password,
            } = req.body;
            if (!firstname || !lastname || !address || !email || !phoneNumber || !password) {
                return Res.handleError(400, 'Please fill all the fields', res);
            }
            if (await Regex.nameCheck(firstname)) return Res.handleError(400, 'enter valid firstname', res);
            if (await Regex.nameCheck(lastname)) return Res.handleError(400, 'enter valid lastname', res);
            if (await Regex.addressCheck(address)) return Res.handleError(400, 'address validation failed', res);
            if (await Regex.phoneCheck(phoneNumber)) return Res.handleError(400, 'Enter valid phone Number', res);
            if (await Regex.passCheck(password)) return Res.handleError(400, 'enter valid password. should be 6 character and more and contain letters and numbers', res);
            if (await Regex.emailCheck(email)) return Res.handleError(400, 'enter valid email e.g user@gmail.com', res);
            const [user] = await Model.findOne('users', 'email', email);
            if (user) return Res.handleError(409, 'email account exists', res);
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async login(req, res, next) {
        try {
            const {
                email,
                password,
            } = req.body;
            if (!email || !password) {
                return Res.handleError(400, 'Please fill all the fields', res);
            }
            if (await Regex.passCheck(password)) return Res.handleError(400, 'enter valid password. should be 6 character and more and contain letters and numbers', res);
            if (await Regex.emailCheck(email)) return Res.handleError(400, 'enter valid email e.g user@gmail.com', res);
            const [user] = await Model.findOne('users', 'email', email);
            if (!user) return Res.handleError(404, 'User is not registered. Sign up to create account', res);
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async property(req, res, next) {
        try {
            const {
                price, state, city, address, type,
            } = req.body;
            if (!price || !state || !city || !address || !type) {
                return Res.handleError(400, 'Please fill all the fields', res);
            }
            if (await Regex.floatCheck(price)) return Res.handleError(400, 'Price should be a positive float', res);
            if (await Regex.nameCheck(state)) return Res.handleError(400, 'Please enter valid State', res);
            if (await Regex.nameCheck(city)) return Res.handleError(400, 'Please enter valid city', res);
            if (await Regex.addressCheck(address)) return Res.handleError(400, 'Please enter a valid address of property', res);
            if (await Regex.typeCheck(type)) return Res.handleError(400, 'Please enter a valid type of property', res);
            res.locals.price = Number(parseFloat(price)).toFixed(2);
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async update(req, res, next) {
        try {
            const { price } = req.body;
            if (!price) return Res.handleError(400, 'Please fill the fields', res);
            if (await Regex.floatCheck(price)) return Res.handleError(400, 'Price should be a number', res);
            res.locals.price = Number(parseFloat(price)).toFixed(2);
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async owner(req, res, next) {
        const owner = res.locals.user.id;
        res.locals.id = parseInt(req.params.property_id, 10);
        if (!await Advert.checkUser(parseInt(req.params.property_id, 10), owner)) return Res.handleError(403, 'None of the ads with such id belongs to you', res);
        next();
    }

    static async checkId(req, res, next) {
        res.locals.id = parseInt(req.params.property_id, 10);
        const [property] = await Model.findOne('properties', 'id', res.locals.id);
        if (!property) return Res.handleError(404, 'Property with such id does not exists', res);
        next();
    }

    static async getAll(req, res, next) {
        const filter = 'status';
        const property = await Model.findOne('properties', filter, 'available');
        if (property.length === 0) return Res.handleError(404, 'No properties available', res);
        next();
    }

    static async type(req, res, next) {
        try {
            const { type } = req.query;
            if (!type) return Res.handleError(400, 'Please ensure there is query type made', res);
            const check = await Model.findOne('properties', 'type', type);
            if (check.length === 0) return Res.handleError(404, 'adverts with this type does not exists', res);
            next();
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async report(req, res, next) {
        try {
            const { reason, description } = req.body;
            if (!reason || !description) return Res.handleError(400, 'Please fill all fields', res);
            next();
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
