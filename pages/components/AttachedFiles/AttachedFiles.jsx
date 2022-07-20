import { useState } from "react";
import { Avatar, Box, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { fileNameShorter } from "../../../utils/FileNameShorter";

export const FileBox = ({ props, isDelete, notSize, secAction }) => {
    const iconSwitch = (type) => {
        switch (type) {
            case 'image': return <ImageIcon />
            default: return <InsertDriveFileIcon />
        }
    }
    return (
        // FIXME TouchRipple отключить для загруженных файлов
        <ListItem
            dense={true}
            disablePadding
            button
            sx={{ border: '1px solid rgba(0, 0, 0, 0.38)', borderRadius: 2, marginY: '.5em', width: '100%' }}
            secondaryAction={secAction}
            >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar>
                        {iconSwitch(props.type)}
                    </Avatar>
                </ListItemAvatar>
                {/* TODO сделать тип файла в конце */}
                <ListItemText primaryTypographyProps={{ fontSize: '1em', fontWeight: 'bold' }} primary={fileNameShorter(props.title, 'attached')} />
                {!notSize && <ListItemText primaryTypographyProps={{ marginTop: -.5, color: 'gray' }} primary={props.size} />}
            </ListItemButton>
        </ListItem>
    )
}

export const AttachedFiles = () => {
    const [attached, setAttached] = useState([
        {
            id: 0,
            title: 'fdgrfdgdfgdfgdfgd.jpg',
            type: 'file',
            size: '29MB'
        },
        {
            id: 1,
            title: 'fdgrfdgdfgdfgdfgderwerwerwrew.jpg',
            type: 'file',
            size: '29MB'
        },
        {
            id: 2,
            title: 'fdgrfdgdfgdfgdfgderwerwerwrew.sql',
            type: 'file',
            size: '29MB'
        }
    ])

    return (
        <Grid container spacing={3} columns={6}>
            {attached.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                    <FileBox props={item} />
                </Grid>
            ))}
        </Grid>

    )
}