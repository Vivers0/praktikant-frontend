import React, { useEffect } from "react";
import Router from 'next/router'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import isEmail from 'validator/lib/isEmail';
import { authRequest } from "../../requests/auth.request";
import { encode } from 'js-base64'

/*
    TODO: Сделать редирект для кнопок
    TODO: ErrorHandler: password
*/

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const [error, setError] = React.useState({
        validEmail: true,
        validPassword: true,
        message: null,
    });


    useEffect(() => {
        const LS = localStorage.getItem('user');
        const SS = sessionStorage.getItem('user');
        if (LS || SS) {
            let type = LS ? JSON.parse(LS).type : JSON.parse(SS).type;
            Router.push(`/${type}`);
        }
    });

    const emailValidatehandler = (e) => {
        const value = e.target.value;
        setEmail(value)
        setError({ ...error, validEmail: !isEmail(value) })
    }

    const validateHandler = () => {
        const e = isEmail(email);
        const p = password && password.length > 6;
        return (e && p) ?? setError({ ...error, message: 'Указаны неполные данные' });
    }

    const auth = async () => {
        const isValid = validateHandler();
        if (isValid) {
            const request = await authRequest(encode(email), encode(password));
            if (request.message) {
                return setError({ ...error, message: request.message });
            }
            const { firstName, secondName, email: mail, type, avatar } = request;
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify({ firstName, secondName, email: encode(mail), avatar, type }));
            } else {
                sessionStorage.setItem('user', JSON.stringify({ firstName, secondName, email: encode(mail), avatar, type }));
            }
            Router.push(`/${type}`);
        }
    }

    const paperStyle = { padding: 20, height: '70vh', width: 380, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <Grid columns={1}
            alignItems="center"
            justifyContent="center"
        >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Вход</h2>
                </Grid>
                <TextField
                    label='Email'
                    placeholder='Введите Email'
                    value={email}
                    fullWidth
                    required
                    sx={{ marginBottom: 1 }}
                    onChange={emailValidatehandler}
                    error={error.validEmail}
                    onKeyPress={(event) => event.key === "Enter" && auth()}
                />
                <TextField
                    label='Пароль'
                    placeholder='Введите пароль'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(event) => event.key === "Enter" && auth()}
                    fullWidth
                    required />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    }
                    label="Запомнить меня"
                />
                {error.message && <Alert severity="error">{error.message}</Alert>}
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={() => auth()}
                >Войти</Button>
                <Typography >
                    <Link href="#" >
                        Забыли пароль?
                    </Link>
                </Typography>
                <Typography >
                        <Link onClick={() => Router.push('register')} >
                        Зарегестрироваться
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;