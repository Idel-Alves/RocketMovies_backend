const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authconfig = require("../configs/auth");

function ensureAuthenticated(request, response, nexxt) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
       const {sub: user_id} = verify(token, authconfig.jwt.secret);

       request.user = {
        id: Number(user_id)
       };

       return nexxt();
    } catch {
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;