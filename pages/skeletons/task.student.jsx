import { Avatar, Box, Grid, Skeleton, Stack, Typography } from "@mui/material"

export const TaskStudentSceleton = () => {
    const CreatedAt = () => (
        <Typography>
            <Skeleton />
        </Typography>
    )
    const Avatars = () => (
        <Stack direction="row" spacing={1} >
            <Skeleton variant="circular">
                <Avatar />
            </Skeleton>
            <Skeleton variant="circular">
                <Avatar />
            </Skeleton>
        </Stack >
    )
    const TitleText = () => (
        <Box>
            <Typography component="div" variant='h1' >
                <Skeleton />
            </Typography>
            <Typography component="div" variant='h1' >
                <Skeleton />
            </Typography>
        </Box>
    )
    const DescriptionText = () => (
        <Box>
            <Typography variant='caption'><Skeleton /></Typography>
            <Typography variant='caption'><Skeleton /></Typography>
            <Typography variant='caption'><Skeleton /></Typography>
            <Typography variant='caption'><Skeleton /></Typography>
            <Typography variant='caption'><Skeleton /></Typography>
        </Box>
    )
    const AttachedFiles = () => (
        <Stack direction="row" spacing={8} style={{ marginTop: '2em' }}>
            <Skeleton
                variant="rectangular"
                width={310}
                height={60}
            />
            <Skeleton
                variant="rectangular"
                width={310}
                height={60}
            />
            <Skeleton
                variant="rectangular"
                width={310}
                height={60}
            />
        </Stack>
    )
    return (
        <Grid container>
            <Grid item xs={8}>
                <CreatedAt />
                <Avatars />
                <TitleText />
                <DescriptionText />
                <AttachedFiles />
            </Grid>
        </Grid>
    )
}