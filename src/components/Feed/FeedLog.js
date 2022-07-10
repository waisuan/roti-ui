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

import API from '../../api/FeedApi';
import FeedLogRow from "./FeedLogRow";
import FeedLogRowActions from "./FeedLogRowActions";
import FeedLogRowForm from "./FeedLogRowForm";

class FeedLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pageLimit: 1000,
            pageOffset: 0,
            currClickedRow: "",
            currEditRow: undefined,
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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
    
    handleRowClick(row) {
        this.setState({currClickedRow: row.workOrderNumber});
    }

    handleCancel() {
        this.setState({currClickedRow: ""});
    }

    handleEdit(row) {
        this.setState({currEditRow: row});
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
                            {this.state.data.map((row) => {
                                if (this.state.currEditRow && this.state.currEditRow.workOrderNumber === row.workOrderNumber) {
                                    return <FeedLogRowForm key={row.workOrderNumber} />
                                } else if (this.state.currClickedRow === row.workOrderNumber) {
                                    return <FeedLogRowActions key={row.workOrderNumber} handleCancel={(_) => this.handleCancel()} handleEdit={(_) => this.handleEdit(row)} />
                                } else {
                                    return <FeedLogRow 
                                                key={row.workOrderNumber} 
                                                row={row}
                                                handleRowClick={(_) => this.handleRowClick(row)}
                                            />
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default withRouter(FeedLog);