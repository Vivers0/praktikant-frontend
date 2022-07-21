import '@fontsource/roboto/500.css';
import React from 'react';
import { ColorModeContext, Header } from "../components/Header/Header"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import { StudentTodo } from '../components/Student/StudentTodo';
import { Weather } from '../components/Weather/Weather';
import { useEffect } from 'react';
import Router from 'next/router';

const StudentPage = () => {
    const [mode, setMode] = React.useState('light');
    // React.useEffect(() => setMode(localStorage.getItem('theme') || 'light'), [setMode])
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
                // console.log(mode)
                // localStorage.setItem('theme', mode);
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
                typography: {
                    fontFamily: [
                        '-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        '"Helvetica Neue"',
                        'Arial',
                        'sans-serif',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                    ].join(','),
                }
            }),
        [mode],
    );

    useEffect(() => {
        const LS = localStorage.getItem('user');
        const SS = sessionStorage.getItem('user');
        if (!LS && !SS) {
            Router.push('/login')
        }
    })
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Header />
                <Container sx={{ marginTop: '5em'}}>
                    
                    <Grid container spacing={4}>
                        <StudentTodo />
                        <Weather />
                    </Grid>
                </Container>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default StudentPage;