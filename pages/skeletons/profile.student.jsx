import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { Header } from "../components/Header/Header";

/*
    TODO: Отцентровать skeleton, добавить Typography и button
*/

export const ProfileStudentSkeleton = () => (
    <Box>
        <Header />
        <Container maxWidth="xl">
            <Grid
                container
                columns={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={1} >
                    <Skeleton variant="circular" width={300} height={300} />
                    <Stack sx={{ width: '30em', marginTop: '2em', marginLeft: '2.5em' }}>
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
);