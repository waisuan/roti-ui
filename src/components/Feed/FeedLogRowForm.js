import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import FeedEditHeader from './FeedEditHeader';

export default function FeedLogRowForm(props) {
    return (
        <TableRow>
            <TableCell colSpan={6} align="center">
                <Container maxWidth="md">
                    <FeedEditHeader />
                    <form>
                        <Grid container spacing={1} mb={1} mt="1px">
                            <Grid item xs>
                                <TextField
                                    label="Work Order No."
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    label="Date"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    label="Type"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    label="Reported By"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <TextField 
                                    label="Action Taken"
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </TableCell>
        </TableRow>
    );
}