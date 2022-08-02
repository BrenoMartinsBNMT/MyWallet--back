export function hasEmail(query) {
    if (query) {
        throw { error: 403, message: "Email já cadastrado!" };
    }
}
export function hasNoEmail(query) {
    if (!query) {
        throw { error: 404, message: "Email não cadastrado!!" };
    }
}
export function Unauthorized() {
    throw { error: 401, message: "Não autorizado" };
}
