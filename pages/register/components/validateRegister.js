import validator from 'validator';

export const validateRegister = (data, repeatPassword, errorState) => {
    switch (true) {
        case !Object.values(data).every(Boolean):
            return errorState('Введены не все данные!');
        case data.password.length < 6:
            return errorState('Длинна пароля должна быть больше 6 символов!');
        case !repeatPassword:
            return errorState('Вы повторно не ввели пароль!');
        case data.password !== repeatPassword:
            return errorState('Пароли не совпадают!');
        case !validator.isEmail(data.email):
            return errorState('Неправильный email!');
        // case !validator.isMobilePhone(data.phone, 'ru-RU'):
        //     return errorState('Неправильный номер телефона!');
        default:
            return true;
    }
}