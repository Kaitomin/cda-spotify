export function sanitizeInput(input, type) {
  // console.log(input)
  const regexp = new RegExp(/^[a-zA-Z0-9\s/]{2,}$/)
  const regexpDate = new RegExp(/^[0-9\s/-]{2,}$/)

  switch (type) {
    case "title":
    case "playlistName":
    case "artist":
      if (!input.trim()) {
        return "Le champ est requis"
      } else if (input.length < 2) {
        return "Vous devez avoir plus de deux caractères"
      } else if (regexp.test(input)) {
        return ""
      }
      return "Un des caractères n'est pas autorisé"
    case "releasedAt":
      if (!input.trim()) {
        return "Le champ est requis"
      } else if (regexpDate.test(input)) {
        return ""
      }
      return "Un des caractères n'est pas autorisé"
    case "imgFile":
    case "audioFile":
      if (input) {
        return ""
      }
      return "Le champ est requis"
    case "tags":
      if (input.length === 0) {
        return "Sélectionnez au moins un tag"
      }
      return ""
    case "username":
      if (!input.trim()) {
        return "Le champ est requis"
      } else if (input.length < 2) {
        return "Vous devez avoir plus de deux caractères"
      } else if (/^[a-zA-Z0-9/]{2,}$/.test(input)) {
        return ""
      }
      return "Un des caractères n'est pas autorisé"
    case "password":
    case "confirmPassword":
      if (input.length === 0) {
        return "Le champ est requis"
      } else if (input.length < 5) {
        return "Vous devez avoir au moins 5 caractères"
      } else if (!(/^[a-zA-Z0-9+_!@?/]{2,}$/).test(input)) {
        return "Un des caractères n'est pas autorisé"
      }
      return ""
    case "search":
      if (input.length > 0 && !input.trim()) {
        return "Empty"
      }
      if (!(/^[a-zA-Z0-9\s/]*$/).test(input)) {
        return "Invalid input"
      }
      break;
    // for id, version, duration (fetched from current music, not to be manually edited) | imgUri, audioUri (not mandatory) when modifying a music - no check done
    default:
      return ""
  }
}
