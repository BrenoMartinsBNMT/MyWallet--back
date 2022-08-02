export function isTokenValid(token: string) {
  if (!token) {
    throw { error: 401, message: "usuário não autorizado!" };
  }
}
