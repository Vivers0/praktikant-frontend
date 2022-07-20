import { Box, Button, Fab, FilledInput, Grid, IconButton, Input, List } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { FileBox } from "../AttachedFiles/AttachedFiles";
import { bytesConverter } from "../../../utils/BytesConverter";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { fileNameShorter } from "../../../utils/FileNameShorter";

export const UploadTask = () => {
    const [files, setFiles] = useState([])

    const handleChange = e => {
        const { name, size, type } = e.target.files[0];
        const [doc, t] = type.split('/');
        const fileType = name.split('.')[name.split('.').length - 1]
        const obj = {
            title: fileNameShorter(name, 'uploaded'),
            type: doc,
            size: bytesConverter(size),
            id: files.length + 1,
        }
        setFiles([...files, { ...obj }])
    }

    const deleteFiles = (item) => {
        const newFiles = [...files];
        const findFile = files.findIndex(i => i.id === item)
        newFiles.splice(findFile, 1);
        setFiles(newFiles)
    }

    const UploadBtn = () => {
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button component="label">
                        <AddIcon /> Загрузить файл
                        <input type="file" hidden onChange={handleChange} />
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ marginTop: '.5em' }}>
                        Отправить
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <Grid item sx={{ width: '100%', height: '10em' }} xs={3}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {files && files.map((file, i) => <FileBox
                    props={file}
                    notSize={true}
                    key={i}
                    secAction={(
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteFiles(file.id)} >
                            <DeleteIcon />
                        </IconButton>)} />)}
            </List>
            <UploadBtn />
        </Grid>
    )
}