import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { registerRequest } from '../../requests/register.request';
import { RegistrationSelectType } from './components/SelectType';
import { RegisterEmailField, RegisterInitialsField, RegisterPasswordField, RegisterPhoneField } from './components/TextFields';
import { validateRegister } from './components/validateRegister';

/* 
    TODO: ErrorHandler
    TODO: Поле для кода из email
    FIXME: Сделать redirect для teacher
*/

const Registraction = () => {
    const [data, setData] = useState({
        firstName: '',
        secondName: '',
        email: '',
        phone: '',
        password: '',
        type: 'student'
    });
    const [confirmLicense, setConfirmLicense] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const reducer = (d, state) => {
        if (d === 'repeatPassword') return setRepeatPassword(state);
        setData({ ...data, [d]: state });
    }

    const validate = async () => {
        const isValid = validateRegister(data, repeatPassword, setError);
        if (isValid && confirmLicense) {
            const request = await registerRequest(data);
            if (request.message) {
                return setError(request.message)
            }
            setError('')
            localStorage.setItem('user', JSON.stringify(request));
            localStorage.setItem('rememberMe', true);
            return Router.push(data.type === 'student' ? 'student' : 'teacher');
        }
    }
    
    const paperStyle = { padding: 20, height: '77vh', width: 380, margin: "20px auto" }
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
                    <h2>Регистрация</h2>
                </Grid>
                <RegistrationSelectType reducer={reducer} data={data.type}/>
                <RegisterEmailField reducer={reducer} data={data.email} />
                <RegisterPhoneField reducer={reducer} data={data.phone} />
                <RegisterInitialsField reducer={reducer} data={data} />
                <RegisterPasswordField reducer={reducer} data={data} rp={repeatPassword} />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                            value={confirmLicense}
                            onChange={(e) => setConfirmLicense(e.target.checked)}
                        />
                    }
                    label={<p>Я даю согласие на обработку <Link>персональных данных</Link></p>}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={() => validate()}
                >Зарегестрироваться</Button>
            </Paper>
        </Grid>
    )
}

export default Registraction;
