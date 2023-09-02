export function sanitizeInput(input) {
    if (!input.trim()) {
        return "Le champ est requis"
    }
    const regexp = new RegExp (/^[a-zA-Z0-9\s]+$/)
    if (regexp.test(input)) {
        return ""
    }else{
        return "Un des caracteres n'est pas correcte"
    }
}