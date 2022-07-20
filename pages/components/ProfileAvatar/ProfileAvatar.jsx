import { Alert, Avatar, IconButton } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { deepOrange } from '@mui/material/colors';
import { Box } from "@mui/system"
import { getBase64 } from "../../../utils/getbase64";
import { updateAvatarRequest } from "../../../requests/profile.request";
import { link } from '../../../env.local.json';

export const ProfileAvatar = ({ avatar, handleUser }) => {
    const handleClick = (e) => {
        const file = e.target.files[0];
        updateAvatarRequest(btoa('savva.povetkin@mail.ru'), file)
            .then(res => {
                handleUser(prev => {
                    return { ...prev, ...{ avatar: `${link}/${res.avatar}` } }
                });
            })
    }
    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center">
            <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handleClick} />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span" style={{ width: 300, height: 300 }}>
                    {avatar
                        ? <Avatar src={avatar} style={{ width: '100%', height: '100%' }} sx={{ bgcolor: deepOrange[500] }} />
                        : <Avatar style={{ width: '100%', height: '100%' }} sx={{ bgcolor: deepOrange[500], fontSize: 150 }} >UR</Avatar>
                    }
                </IconButton>
            </label>
        </Box>
    )
}