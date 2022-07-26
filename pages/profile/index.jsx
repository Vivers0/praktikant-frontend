import { Alert, Box, Button, Card, CardActionArea, CardContent, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Container } from "@mui/system";
import { useState } from "react";
import { Header } from "../components/Header/Header";
import { ProfileAvatar } from "../components/ProfileAvatar/ProfileAvatar";
import Countdown from "react-countdown";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import { profileRequest } from "../../requests/profile.request";
import { link } from '../../env.local.json';
import { ProfileStudentSkeleton } from "../skeletons/profile.student";
import Router from 'next/router';

const UserClassroom = ({ classroom }) => {
    const [cr, setCr] = useState(classroom)
    const HasClassroom = () => {
        const getDuration = () => {
            const at = dayjs(classroom.createdAt).format('DD.MM.YYYY');
            const to = dayjs(classroom.deadlineAt).format('DD.MM.YYYY');
            return `${at} - ${to}`;
        }

        const CD = () => {
            return (
                <Countdown
                    date={classroom.deadlineAt}
                    intervalDelay={0}
                    precision={3}
                    renderer={props => props.days}
                />
            )
        }
        return (
            <Stack sx={{ width: '30em', marginTop: '2em' }}>
                <Box sx={{ border: '2px solid #808080', borderRadius: '5px' }}>
                    <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                        {classroom.name.length <= 31 ? classroom.name : classroom.name.substring(0, 31) + '...'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                        Продолжительность: {getDuration()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                        Осталось <CD /> дней
                    </Typography>
                </Box>
            </Stack >
        )
    }

    const EmptyClassroom = () => {
        return (
            <Stack sx={{ width: '30em', marginTop: '2em' }}>
                <Box sx={{ border: '2px solid #808080', borderRadius: '5px', paddingY: '1em' }}>
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <TextField id="outlined-basic" label="Код практики" variant="outlined" sx={{ width: '75%' }} />
                    </Box>
                    <Box
                        sx={{ marginTop: '1em' }}
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <Button variant="outlined" color="success" sx={{ width: '50%' }} startIcon={<AddIcon />}>Присоедениться</Button>
                    </Box>
                </Box>
            </Stack>
        )
    }

    return classroom ? <HasClassroom cr={classroom} /> : <EmptyClassroom />
}

const LogOut = () => {
    const logOut = () => {
        localStorage.clear();
        sessionStorage.clear();
       Router.push('/');
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: '2em' }}
        >
            <Button variant="outlined" color="error" onClick={logOut}>Выйти</Button>
        </Box>
    )
}

const Profile = () => {
    const [user, setUser] = useState({
        firstName: null,
        secondName: null,
        email: null,
        phone: null,
        password: null,
        createdAt: new Date().toISOString(),
        avatar: null
    })
    const [classroom, setClassroom] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const request = async () => {
            const db = localStorage.getItem('user') || sessionStorage.getItem('user');
            const { email } = JSON.parse(db);
            const data = await profileRequest(email);
            const avatar = data.avatar ? `${link}/${data.avatar}.png` : `${data.firstName.at(0)}${data.secondName.at(0)}`;
            setUser({
                ...data,
                ...{ avatar }
            })
            setClassroom(data.classroom)
        }

        request().then(() => setLoading(true));
    }, [setUser]);

    return loading ? (
        <Box>
            <Header />
            <Container maxWidth="xl">
                <Grid
                    container
                    columns={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}>
                    <Grid item xs={1} >
                        <ProfileAvatar avatar={user.avatar} handleUser={setUser} />
                        <Typography variant="h4" style={{ textAlign: 'center', marginTop: '.5em' }}>{user.firstName} {user.secondName}</Typography>
                        <UserClassroom classroom={classroom} />
                        <LogOut />
                    </Grid>
                </Grid>
            </Container>
            {/* <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Успешно!
                </Alert>
            </Snackbar> */}
        </Box>
    ) : <ProfileStudentSkeleton />
}

export default Profile;