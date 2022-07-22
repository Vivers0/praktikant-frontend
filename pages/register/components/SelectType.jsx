import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { Box } from "@mui/system"

export const RegistrationSelectType = ({ reducer, data }) => {
    const studentBtn = { border: '.5px solid black ', color: 'black', borderRadius: 0, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' };
    const studentActiveBtn = { border: '.5px solid', borderRadius: 0, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }
    const teacherBtn = { border: '.5px solid black ', color: 'black', borderRadius: 0, borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }
    const teacherActiveBtn = { border: '.5px solid', borderRadius: 0, borderTopRightRadius: '5px', borderBottomRightRadius: '5px' };
    return (
        <Box my={2} width={'100%'} display='flex' justifyContent='center'>
            <Button
                sx={data === 'student' ? studentActiveBtn : studentBtn}
                onClick={() => reducer('type', 'student')}
            >Студент</Button>
            <Button
                sx={data === 'teacher' ? teacherActiveBtn : teacherBtn}
                onClick={() => reducer('type', 'teacher')}
            >Преподаватель</Button>
        </Box>
    )
}