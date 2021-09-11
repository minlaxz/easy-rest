export const Response = class {
    constructor(res, message) {
        this.res = res;
        this.message = message;
    };

    welcome() {
        this.status = 200;
        this.success = true;
        return this.response();
    };

    rejected(status) {
        this.status = status || 400;
        return this.response();
    };

    accepted(status, token, exp, auth) {
        this.status = status || 200;
        this.token = token;
        this.exp = exp;
        this.success = true;
        this.authentication = auth || false;
        return this.response();
    }

    response() {
        return this.res.status(this.status).json({
            success: this.success || false,
            authentication: this.authentication || false,
            message: this.message,
            token: this.token || null,
            expiresIn: this.exp || null
        });
    };
};