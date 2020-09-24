var validator = require("email-validator");

//Проверка на пустую строку
export const requierdField = (value) => {
    if (value) {
        return undefined;
    }
    return "Field is required";
}

//Проверка максимального значения символов
export const maxLength = (number) => {
    return (value) => {
        if (value && value.length > number) {
            return `Max length is ${number} symbols`;
        }
        return undefined;
    }

}

//Проверка минимального значения символов
export const minLength = (number) => {
    return (value) => {
        if (value && value.length < number) {
            return `Min length is ${number} symbols`;
        }
        return undefined;
    }

}

//Проверка почты
export const emailValid = (email) => {
    if (validator.validate(email)) {
        return undefined;
    }

    return "unvalid email";
}

