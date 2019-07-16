import Res from '../helpers/responses';
import Regex from '../helpers/Regexes';
import User from '../../Models/UsersModel';

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
            const user = await User.getUser(email);
            if (await user.length !== 0) return Res.handleError(409, 'email account exists', res);
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
            const user = await User.getUser(email);
            if (await user.length === 0) return Res.handleError(404, 'User is not registered. Sign up to create account', res);
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
}
