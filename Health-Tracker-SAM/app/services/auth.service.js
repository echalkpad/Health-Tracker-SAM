"use strict";
const sam_auth_1 = require('../sam/sam.auth');
class AuthService extends sam_auth_1.Auth {
    constructor(auth) {
        super(auth);
        this.auth = auth;
    }
}
exports.AuthService = AuthService;
;
//# sourceMappingURL=auth.service.js.map