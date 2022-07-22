export const validateRegister = (data, repeatPassword, errorState) => {
    switch (true) {
        case !repeatPassword:
            return errorState('Вы повторно не ввели пароль!');
        case data.password !== repeatPassword:
            return errorState('Пароли не совпадают!');
        case data.password.length < 6:
            return errorState('Длинна пароля должна быть больше 6 символов!');
        case Object.values(data).every(Boolean):
            return errorState('Введены не все данные!');
        default:
            return false; 
    }  
}