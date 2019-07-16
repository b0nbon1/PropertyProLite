export default class Responses {
    static handleSuccess(statusCode, message, data, res) {
        res.status(statusCode).json({
            status: statusCode,
            message,
            data,
        });
    }

    static handleOk(statusCode, message, res) {
        res.status(statusCode).json({
            status: statusCode,
            message,
        });
    }

    static handleError(statusCode, error, res) {
        res.status(statusCode).json({
            status: statusCode,
            error,
        });
    }
}
