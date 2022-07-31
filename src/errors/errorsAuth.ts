export default function hasEmail(query) {
  if (query) {
    throw { error: 403, message: "Email já cadastrado!" };
  }
}
