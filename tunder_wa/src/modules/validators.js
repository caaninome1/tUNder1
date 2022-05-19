export default function useValidators() {

    const isEmpty = (fieldName, fieldValue) => {
        let x = fieldName
        if (fieldName === "name")
            x = "nombre"
        return !fieldValue ? "El campo " + x + " es obligatorio" : "";
    }

    const minLength = (fieldName, fieldValue, min) => {
        let x = fieldName
        if (fieldName === "name")
            x = "nombre"
        return fieldValue.length < min ? `El campo ${x} debe tener al menos ${min} caracteres` : "";
    }

    const isEmail = (fieldName, fieldValue) => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(fieldValue) ? "La entrada no es un " + fieldName + " valido" : "";
    }
    
    
    // const isNum = (fieldName, fieldValue) => {
    //     let isNum = /^\d+$/.test(fieldValue);
    //     return !isNum ? "The " + fieldName + " field only have numbers" : "";
    // }

    return { isEmpty, minLength, isEmail}
}