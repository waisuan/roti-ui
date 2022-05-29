import { Component } from "react";
import { withRouter } from "../../utils/WithRouter";
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AttachmentIcon from '@mui/icons-material/Attachment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FeedEditHeader from './FeedEditHeader';

import API from '../../api/FeedApi';

class FeedLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pageLimit: 1000,
            pageOffset: 0,
            currClickedRow: ""
        }

        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData() {
        API.getFeedLog(this.props.params.id, this.state.pageLimit, this.state.pageOffset)
            .then(data => {
                if (data.length !== 0) {
                    this.setState({
                        data: this.cleanDataRows(data.history)
                    });
                }
            });
    }

    cleanDataRows(dataRows) {
        return dataRows.map(d => {
            return this.cleanDataRow(d);
        });
    }

    cleanDataRow(dataRow) {
        Object.entries(dataRow).forEach(entry => {
            const [key, value] = entry;
            if (key === "workOrderDate") {
                dataRow[key] = value?.length === 0 ? null : value;
            } else {
                dataRow[key] = value || "";
            }
        })
        const dateFormat = "DD/MM/YYYY HH:mm";
        dataRow.createdAt = dayjs(dataRow.createdAt).format(dateFormat);
        dataRow.updatedAt = dayjs(dataRow.updatedAt).format(dateFormat);
        return dataRow;
    }
    
    handleRowClick(event, row) {
        this.setState({currClickedRow: row.workOrderNumber});
    }

    handleCancel() {
        this.setState({currClickedRow: ""});
    }

    render() {
        const tableHeaderStyle = { bgcolor: 'primary.main', color: 'primary.contrastText' };

        return (
            <Container maxWidth="xl">
                <h1>{this.props.params.id}</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyle}>Work Order No.</TableCell>
                                <TableCell sx={tableHeaderStyle}>Date</TableCell>
                                <TableCell sx={tableHeaderStyle}>Type</TableCell>
                                <TableCell sx={tableHeaderStyle}>Reported By</TableCell>
                                <TableCell sx={tableHeaderStyle}>Action Taken</TableCell>
                                <TableCell sx={tableHeaderStyle}>Attachment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
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
                            {this.state.data.map((row) => (
                                this.state.currClickedRow === row.workOrderNumber
                                    ? (
                                        <TableRow key={row.workOrderNumber} selected={true}>
                                            <TableCell colSpan={6} align="center">
                                                <Tooltip title="Edit">
                                                    <IconButton size="small" color="primary">
                                                        <EditIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton size="small" color="error">
                                                        <DeleteForeverIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cancel">
                                                    <IconButton size="small" color="secondary" onClick={this.handleCancel}>
                                                        <CancelIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                      )
                                    : (
                                        <Tooltip key={row.workOrderNumber} title={`Last updated: ${row.updatedAt}`} placement="right">
                                            <TableRow key={row.workOrderNumber} hover={true} selected={false} onClick={(event) => this.handleRowClick(event, row)}>
                                                <TableCell component="th" scope="row" sx={{ width: "10%"}}>
                                                    {row.workOrderNumber}
                                                </TableCell>
                                                <TableCell sx={{ width: "10%"}}>
                                                    {row.workOrderDate}
                                                </TableCell>
                                                <TableCell sx={{ width: "5%"}}>
                                                    {row.workOrderType}
                                                </TableCell>
                                                <TableCell sx={{ width: "10%"}}>
                                                    {row.reportedBy}
                                                </TableCell>
                                                <TableCell sx={{ width: "50%" }}>
                                                    {row.actionTaken}
                                                </TableCell>
                                                <TableCell sx={{ width: "5%" }} align="center">
                                                    {
                                                        row.attachment ? 
                                                        <IconButton size="small">
                                                            <AttachmentIcon fontSize="inherit"/>
                                                        </IconButton> : ""
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </Tooltip>
                                      )
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default withRouter(FeedLog);