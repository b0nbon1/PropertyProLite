import User from '../Models/UsersModel';
import Res from '../utils/helpers/responses';
import Token from '../utils/helpers/jwt';
import Encrypt from '../utils/helpers/encrypt';

const isAdmin = false;

export default class Authentication {
    static async register(req, res) {
        try {
            const {
                firstname,
                lastname,
                email,
                address,
                phoneNumber,
                password,
            } = req.body;
            const hashedPassword = await Encrypt.hash(password);
            const newUser = new User({
                email,
                firstname,
                lastname,
                phoneNumber,
                password: hashedPassword,
                address,
                isAdmin,
            });
            await newUser.register();
            const token = await Token.newToken({
                email: newUser.result.email,
                id: newUser.result.id,
            });
            const data = { token };
            return Res.handleSuccess(201, 'successfully created account', data, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
