import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useEffect, useState } from "react"
import { weatherRequest } from '../../../requests/weather.requests'
import { WeatherIcon } from './WeatherIcon';

export const Weather = () => {
    const now = dayjs()
    const [weather, setWeather] = useState({
        weather:[{ icon: '02n' }],
        main: { temp: 20}
    })
    const [time, setTime] = useState(now.format('HH:mm'))
    

    useEffect(() => {
        setInterval(() => {
            const s = dayjs().format('HH:mm');
            setTime(prev => prev === s ? prev : s)
        }, 1000);
        weatherRequest('Moscow').then(d => setWeather(d));
    }, [setWeather])

    return weather && (
        <Grid item xs={6}
            // 
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <WeatherIcon icon={weather.weather[0].icon} />
            </Box>
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Москва</Typography>
            <Typography sx={{ fontSize: '70px', fontWeight: 'bold', textAlign: 'center' }}>{Math.round(weather.main.temp)}°С</Typography>
            <Typography sx={{ fontSize: '70px', fontWeight: 'bold', textAlign: 'center' }}>{time}</Typography>
        </Grid>
    )
}