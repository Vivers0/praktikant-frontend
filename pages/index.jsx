import { Box, CircularProgress } from '@mui/material';
import Router from 'next/router';
import React from 'react';
import { useEffect } from 'react';

export default function Home() {

  const switcher = () => {
    const data = localStorage.getItem('user');
    if (!data) return Router.push('/login');

    switch (JSON.parse(data).type) {
      case 'admin':
        return Router.push('/admin');
      case 'student':
        return Router.push('/student');
      case 'teacher':
        return Router.push('/teacher');
      default:
        return Router.push('/login');
    }
  }

  useEffect(() => {
    switcher();
    return () => console.log();
  })

  return (
    <Box
      alignItems="center"
      verticalAlignment="center"
      justifyContent="center"
      display="flex"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Box>
  )
}
