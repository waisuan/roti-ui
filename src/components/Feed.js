import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import 'dayjs';
import DayJsUtils from '@date-io/dayjs';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TimelineIcon from '@material-ui/icons/Timeline';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import './Feed.css';

class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {formState: "default"};
        this.handleEditState = this.handleEditState.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleEditState() {
        this.setState({formState: "edit"});
    }

    handleItemChange(e) {
        this.props.onItemChange(e, this.props.index);
    }

    render() {
        const isReadOnly = this.state.formState === "default";
        const isEditMode = this.state.formState === "edit";

        const headerButtons = () => {
            if (isReadOnly) {
                return (
                    <div>
                        <Tooltip title="Edit">
                            <IconButton size="small" color="primary" aria-label="edit" onClick={this.handleEditState}>
                                <EditIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton size="small" color="secondary" aria-label="delete">
                                <DeleteForeverIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Log">
                            <IconButton size="small" aria-label="timeline">
                                <TimelineIcon fontSize="inherit"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Typography variant="caption" color="textSecondary">
                            Editing...
                        </Typography>
                        <IconButton size="small" color="primary" aria-label="save">
                            <SaveIcon fontSize="inherit"/>
                        </IconButton>
                        <IconButton size="small" color="secondary" aria-label="cancel">
                            <CancelIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                );
            }
        };

        return (
            <Paper className="feedItem">
                <div className="header">
                    {headerButtons()}
                </div>
                <form>
                    <Grid container>
                        <Grid item xs>
                            <TextField
                                id='serialNumber'
                                label='Serial No.'
                                defaultValue={this.props.item.serialNumber}
                                variant="outlined"
                                size="small"
                                disabled
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='customer'
                                name='customer'
                                label='Customer'
                                defaultValue={this.props.item.customer}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                                onChange={this.handleItemChange}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='state'
                                label='State'
                                defaultValue={this.props.item.state}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='district'
                                label='District'
                                defaultValue={this.props.item.district}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <TextField
                                id='accountType'
                                label='Type'
                                defaultValue={this.props.item.accountType}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='model'
                                label='Model'
                                defaultValue={this.props.item.model}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='brand'
                                label='Brand'
                                defaultValue={this.props.item.brand}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='status'
                                label='Status'
                                defaultValue={this.props.item.status}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <MuiPickersUtilsProvider utils={DayJsUtils}>
                                <KeyboardDatePicker
                                    id='tncDate'
                                    label='TNC Date'
                                    value={this.props.item.tncDate}
                                    format="YYYY-MM-DD"
                                    variant="inline"
                                    inputVariant="outlined"
                                    margin="dense"
                                    disableToolbar
                                    className="textField"
                                    readOnly={!isEditMode}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs>
                            <MuiPickersUtilsProvider utils={DayJsUtils}>
                                <KeyboardDatePicker
                                    id='ppmDate'
                                    label='PPM Date'
                                    value={this.props.item.ppmDate}
                                    format="YYYY-MM-DD"
                                    variant="inline"
                                    inputVariant="outlined"
                                    margin="dense"
                                    disableToolbar
                                    className="textField"
                                    readOnly={!isEditMode}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='reportedBy'
                                label='Reported By'
                                defaultValue={this.props.item.reportedBy}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id='assignee'
                                label='Assignee'
                                defaultValue={this.props.item.personInCharge}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                            />
                        </Grid>
                    </Grid>
                </form>
                <Typography variant="caption" color="textSecondary">
                    <div className="footer">
                        Created On: {this.props.item.createdOn} | Updated On: {this.props.item.updatedOn}
                    </div>
                </Typography>
            </Paper>
        );
    }
}

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [{
            serialNumber: 'S001', 
            customer: 'Evan', 
            state: 'State', 
            district: 'District',
            accountType: 'Type',
            model: 'Model',
            brand: 'Brand',
            status: 'Status',
            tncDate: '2021-01-01',
            ppmDate: '2021-12-31',
            reportedBy: 'Reporter',
            personInCharge: 'Person',
            createdOn: '2019-01-01',
            updatedOn: '2019-12-31'
        },
        {
            serialNumber: 'S002', 
            customer: 'Evan', 
            state: 'State', 
            district: 'District',
            accountType: 'Type',
            model: 'Model',
            brand: 'Brand',
            status: 'Status',
            tncDate: '2021-01-01',
            ppmDate: '2021-12-31',
            reportedBy: 'Reporter',
            personInCharge: 'Person',
            createdOn: '2019-01-01',
            updatedOn: '2019-12-31'
        }]};

        this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleItemChange(e, index) {
        console.log(index);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    render() {
        const feedItems = this.state.data.map((rec, index) => {
            return (
                <Grid key={rec.serialNumber} item xs={12}>
                    <FeedItem index={index} item={rec} onItemChange={this.handleItemChange}/>
                </Grid>
            );
        });
        return (
            <Grid container spacing={1}>
                {feedItems}
            </Grid>
        );
    }
}

export default Feed;