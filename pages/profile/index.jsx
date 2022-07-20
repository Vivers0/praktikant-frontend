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

// {
//     title: 'ИНФ. ТЕХНОЛОГИИ 12.06.22 ИНФ.',
//     durationAt: '2022-07-11T17:02:53.029Z',
//     durationTo: '2022-08-11T17:02:53.029Z',
// }

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
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: '2em' }}
        >
            <Button variant="outlined" color="error">Выйти</Button>
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

    useEffect(() => {
        const request = async () => {
            const data = await profileRequest(btoa('savva.povetkin@mail.ru'));
            console.log(data)
            setUser({
                ...data.user,
                ...{ avatar: `${link}/${data.user.avatar}.png` }
            })
            setClassroom(data.classroom)
        }

        request();
    }, [setUser]);

    return true ? <ProfileStudentSkeleton /> : (
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
    )
}

export default Profile;