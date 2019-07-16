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

    static async loginUser(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;
            const checkUser = new User(email);
            await checkUser.login();
            if (await Encrypt.check(password, checkUser.result.password)) {
                // eslint-disable-next-line no-shadow
                const { id, email } = checkUser.result;
                const token = await Token.newToken({ email, id });
                const data = { token };
                return Res.handleSuccess(200, 'successfully logged in', data, res);
            }
            return Res.handleError(401, 'wrong password!', res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
