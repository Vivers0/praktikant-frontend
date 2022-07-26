import { Box, TextField } from "@mui/material"
import InputMask from 'react-input-mask'

export const RegisterEmailField = ({ reducer, data }) => {
    return (
        <TextField
            label='Email'
            placeholder='Введите Email'
            value={data.email}
            fullWidth
            required
            sx={{ marginBottom: 1 }}
            onChange={e => reducer('email', e.target.value)}
        // error={error.validEmail}
        />
    )
}

export const RegisterPhoneField = ({ reducer, data }) => {
    return (
        <InputMask
            onChange={e => reducer('phone', e.target.value)}
            value={data.phone}
            mask="+7 (999) 999 99 99"
        >
            {() => <TextField
                label='Телефон'
                placeholder='Введите номер телефона'

                fullWidth
                required
                sx={{ marginBottom: 1 }}

            // error={error.validEmail}
            />}
        </InputMask>
    )
}

export const RegisterInitialsField = ({ reducer, data }) => {
    return (
        <Box
            display="flex"
            justifyContent="between"
        // sx={{
        //     '& > :not(:nth-last-child(1))': { mr:1, },
        //     '& > :not(style)': { mt: 1,  width: '18ch' },
        // }}
        >
            <TextField
                label='Имя'
                placeholder='Введите имя'
                value={data.firstName}
                fullWidth
                required
                sx={{ marginBottom: 1, mr: .5 }}
                onChange={e => reducer('firstName', e.target.value)}
            // error={error.validEmail}
            />
            <TextField
                label='Фамилия'
                placeholder='Введите фамилию'
                value={data.secondName}
                fullWidth
                required
                sx={{ marginBottom: 1, ml: .5 }}
                onChange={e => reducer('secondName', e.target.value)}
            // error={error.validEmail}
            />
        </Box>
    )
}

export const RegisterPasswordField = ({ reducer, data, rp }) => {
    return (
        <Box sx={{ mt: '1.5em' }}>
            <TextField
                type="password"
                label='Пароль'
                value={data.password}
                fullWidth
                required
                sx={{ marginBottom: 1 }}
                onChange={e => reducer('password', e.target.value)}
            // error={error.validEmail}
            />
            <TextField
                type="password"
                label='Повторите пароль'
                value={rp}
                fullWidth
                required
                sx={{ marginBottom: 1 }}
                onChange={e => reducer('repeatPassword', e.target.value)}
            // error={error.validEmail}
            />
        </Box>
    )
}