import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Grid, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const TitleText = () => {
    const [user, setUser] = React.useState({ name: 'Савва' })
    return (
        <Box sx={{ fontFamily: 'Roboto', fontSize: '3em', textAlign: 'center' }}>Добрый день, {user.name}</Box>
    )
}

export const StudentTodo = () => {
    const nowDate = () => {
        const now = dayjs();
        const mouth = now.month() + 1
        const dayArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
        return `${now.date() >= 10 ? now.date() : '0' + now.date()}.${mouth >= 10 ? mouth : '0' + mouth}.${now.year()}, ${dayArr[now.day()]}`;
    }
    const [todo, setTodo] = React.useState([
        {
            status: 'complete',
            id: 0,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            status: 'waiting',
            id: 1,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            status: 'complete',
            id: 2,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            status: 'overdue',
            id: 3,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        }
    ]);

    const statusIcon = (status) => {
        switch (status) {
            case 'complete': return <DoneIcon color="success" />
            case 'waiting': return <AccessTimeFilledIcon color='warning' />
            case 'overdue': return <ClearIcon color="error" />
        }
    }

    return (
        <Grid item xs={6} sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <TitleText />
            <Box sx={{ display: 'flex', fontFamily: 'Roboto', fontSize: '1.5em', justifyContent: 'center' }}>
                {nowDate()}
            </Box>
            <nav aria-label="secondary mailbox folders" style={{ marginTop: '2em' }}>
                <List>
                    {todo.length > 0
                        ? todo.map((item, index) => item.status !== 'overdue' && (
                            <Link href={`/student/${item.id}`}>
                                <ListItem disablePadding button sx={{ border: '1px solid rgba(0, 0, 0, 0.38)', borderRadius: 2, marginY: '1em' }} key={index}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {statusIcon(item.status)}
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: -.5 }} primary={item.title.substring(0, 33) + '...'} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))
                        : <Box sx={{ display: 'flex', fontFamily: 'Roboto', fontSize: '1.5em', justifyContent: 'center', color: 'rgba(0, 0, 0, 0.38)' }}>Пока что заданий нет</Box>}
                </List>
            </nav>
            <Box sx={{ fontFamily: 'Roboto', fontSize: '2em', textAlign: 'center', marginTop: '1em' }}>Просроченные</Box>
            {todo.length > 0
                ? todo.map((item, index) => item.status === 'overdue' && (
                    <Link href={`/student/${item.id}`}>
                        <ListItem disablePadding button sx={{ border: '1px solid rgba(0, 0, 0, 0.38)', borderRadius: 2, marginY: '1em' }} key={index}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {statusIcon(item.status)}
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: -.5 }} primary={item.title.substring(0, 33) + '...'} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))
                : <Box sx={{ display: 'flex', fontFamily: 'Roboto', fontSize: '1.5em', justifyContent: 'center', color: 'rgba(0, 0, 0, 0.38)' }}>Просроченных заданий нет</Box>}
        </Grid>
    );
}
