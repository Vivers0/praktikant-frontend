import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { RegistrationSelectType } from './components/SelectType';
import { RegisterEmailField, RegisterInitialsField, RegisterPasswordField, RegisterPhoneField } from './components/TextFields';
import { validateRegister } from './components/validateRegister';

/* 
    TODO: ErrorHandler
    FIXME: Увеличить размер Paper, чтобы при ошибке влезала кнопка
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
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const reducer = (d, state) => {
        if (d === 'repeatPassword') return setRepeatPassword(state);
        setData({ ...data, [d]: state });
    }

    const validate = () => {
        const isValid = validateRegister(data, repeatPassword, setError);
        console.log(data)
        if (isValid === false) {
            console.log('da!')
        }
    }

    // useEffect(() => {
    //     console.log(data.type)
    // })
    
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
                            // onChange={(e) => setRememberMe(e.target.checked)}
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
