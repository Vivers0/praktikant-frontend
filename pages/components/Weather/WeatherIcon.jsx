import Image from 'next/image';

export const WeatherIcon = ({icon}) => {
    return <Image alt="" src={`/icons/${icon}.svg`} height="250" width="250" />
}