export function sanitizeInput(input, type) {
    console.log(input, typeof input);
    // if (typeof input === 'string') {
        
        // if (!input.trim()) {
        //     return "Le champ est requis"
        // }
        // const regexp = new RegExp (/^[a-zA-Z0-9\s/-]+$/)
        // if (regexp.test(input)) {
        //     return ""
        // }
        // else{
        //     return "Un des caracteres n'est pas correcte"
    //     }


    // }
    // if (input.length === 0) {
    //     return "Le champ est requis"
    // }


    // const regexp = new RegExp (/^[a-zA-Z0-9\s/-]+$/)
    // if (type === "title") {
    //     if (!input.trim()) {
    //         return "Le champ est requis"
    //     }
    //     if (regexp.test(input)) {
    //         return ""
    //     }
    //     else{
    //         return "Un des caracteres n'est pas correcte"
    //     }    
    // }
    
    // if (type === "artist") {
    //     if (!input.trim()) {
    //         return "Le champ est requis"
    //     }
    //     if (regexp.test(input)) {
    //         return ""
    //     }
    //     else{
    //         return "Un des caracteres n'est pas correcte"
    //     }     
    // }
    
    // if (type === "releasedAt") {
    //     if (!input.trim()) {
    //         return "Le champ est requis"
    //     }
    //     if (input) {
    //         return ""
    //     }
    //     else{
    //         return "Un des caracteres n'est pas correcte"
    //     }     
    // }
    
    // if (type === "imgFile") {
    //     if (input) {
    //         return ""
    //     }
    //     else{
    //         return "Le champ est requis"
    //     }     
    // }
    // if (type === "audioFile") {
    //     if (input) {
    //         return ""
    //     }
    //     else{
    //         return "Le champ est requis"
    //     }     
    // }
    // if (type === "tags") {
    //     if (input.length === 0) {
    //         return "Le champ est requis"
    //     }
    //     return ''

    // }



    const regexp = new RegExp(/^[a-zA-Z0-9\s/-]{2,}$/);
    const regexpDate = new RegExp(/^[0-9\s/-]+$/);


        switch (type) {
        case "title":
        case "artist":
            if (!input.trim()) {
            return  "Le champ est requis";
            } else if (regexp.test(input)) {
            return  ""
            } else if(input.length < 2 ){
                return "Vous devez avoir plus de deux caractères"
            } else {
            return  "Un des caractères n'est pas correct";
            }
            break;
        case "releasedAt":
            if (!input.trim()) {
            return  "Le champ est requis";
            } else if (regexpDate.test(input)) {
            return  "";
            } else {
            return  "Un des caractères n'est pas correct";
            }
            break;

        case "imgFile":
        case "audioFile":
            if (input) {
            return  "";
            } else {
            return  "Le champ est requis";
            }
            break;

        case "tags":
            if (input.length === 0) {
            return  "Le champ est requis";
            } else {
            return  "";
            }
            break;

        default:
            return  "Type non pris en charge";
            break;
        }

    
}
