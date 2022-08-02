export function isTokenValid(token) {
    if (!token) {
        throw { error: 401, message: "usuário não autorizado!" };
    }
}
