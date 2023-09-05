export function sanitizeInput(input, type) {
  // console.log(input)
  const regexp = new RegExp(/^[a-zA-Z0-9\s/]{2,}$/)
  const regexpDate = new RegExp(/^[0-9\s/-]{2,}$/)

  switch (type) {
    case "title":
    case "artist":
      if (!input.trim()) {
        return "Le champ est requis"
      } else if (input.length < 2) {
        return "Vous devez avoir plus de deux caractères"
      } else if (regexp.test(input)) {
        return ""
      } else {
        return "Un des caractères n'est pas correct"
      }
    case "releasedAt":
      if (!input.trim()) {
        return "Le champ est requis"
      } else if (regexpDate.test(input)) {
        return ""
      } else {
        return "Un des caractères n'est pas correct"
      }
    case "imgFile":
    case "audioFile":
      if (input) {
        return ""
      } else {
        return "Le champ est requis"
      }
    case "tags":
      if (input.length === 0) {
        return "Sélectionnez au moins un tag"
      } else {
        return ""
      }
    // for id, version, duration (fetched from current music, not to be manually edited) | imgUri, audioUri (not mandatory) when modifying a music - no check done
    default:
      return ""
  }
}
