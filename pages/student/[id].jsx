import '@fontsource/roboto/500.css';
import React, { useEffect } from 'react';
import Countdown from 'react-countdown';
import { Header } from "../components/Header/Header"
import { Avatar, AvatarGroup, Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { AttachedFiles } from '../components/AttachedFiles/AttachedFiles';
import { UploadTask } from '../components/UploadTask/UploadTask';
import { TaskStudentSceleton } from '../skeletons/task.student';

const TaskPage = () => {
    const router = useRouter()
    const { id } = router.query;

    const [task, setTask] = React.useState(
        {
            title: null,
            description: null,
            authors: [],
            deadlineAt: '2022-07-07T23:58:00.239Z',
            createdAt: '2022-07-07T23:58:00.239Z',
        }
    );

    useEffect(() => setTask({
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu lorem pharetra, porta erat sed, aliquam mauris. ',
        description: 'Nunc cursus neque ipsum, sit amet facilisis elit consectetur in. Aenean vel velit ipsum. Sed aliquam sem et ipsum maximus placerat quis at est. Pellentesque ac lobortis sem, eget pellentesque leo. Aliquam ultricies odio in tincidunt dictum. Donec vitae est eget diam posuere suscipit. Phasellus rutrum dolor et turpis iaculis sagittis. Quisque purus turpis, mattis at feugiat consequat, sodales ut nisl. Aliquam bibendum felis nec vestibulum consectetur. Nulla ut venenatis elit. Donec vulputate efficitur efficitur. Pellentesque et ante sed diam auctor congue. Nulla facilisi.',
        authors: [],
        deadlineAt: dayjs('2022-07-07T23:58:00.239Z').add(105, 'hour'),
        createdAt: '2022-07-07T23:58:00.239Z',
    }), []);

    return Object.values(task).every(Boolean) && (
        <Grid item xs={9}>
            <Typography>Опубликовано: {dayjs(task.createdAt).format('DD.MM.YYYY HH:mm')}</Typography>
            <Stack direction="row" spacing={1}>
                <Avatar alt="Remy Sharp" src="https://imgur.com/huyBFgC.jpg" mx={2} />
                <Avatar alt="Travis Howard" src="https://imgur.com/xMpaqio.jpg" mx={2} />
            </Stack>
            <Typography sx={{ fontSize: '3em', fontWeight: 'bold' }}>{task.title}</Typography>
            <Typography sx={{ fontSize: '1em' }}>{task.description}</Typography>
            <Typography sx={{ fontSize: '1.5em', marginTop: '1em' }}>Дедлайн через: <Countdown
                date={task.deadlineAt}
                intervalDelay={1}
                precision={3}
                renderer={props => {
                    const h = props.hours >= 10 ? props.hours : '0' + props.hours;
                    const m = props.minutes >= 10 ? props.minutes : '0' + props.minutes;
                    const s = props.seconds >= 10 ? props.seconds : '0' + props.seconds;
                    return `${h}:${m}:${s}`
                }}
            />
            </Typography>
            <AttachedFiles />
        </Grid>
    )
}

const Subject = () => {
    const router = useRouter()
    const { id } = router.query;

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(true), 1000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <Box>
            <Header />
            <Container sx={{ marginTop: '5em' }} maxWidth="xl">
                {loading ? (
                    <Grid container spacing={15}>
                        <TaskPage />
                        <UploadTask />
                    </Grid>
                ) : (
                    <TaskStudentSceleton />
                )}

            </Container>
        </Box>
    )
}

export default Subject;