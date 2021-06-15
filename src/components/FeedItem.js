import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs';
import DayJsUtils from '@date-io/dayjs';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import FeedItemDefaultHeader from './FeedItemDefaultHeader';
import FeedItemEditHeader from './FeedItemEditHeader';
import FeedItemDefaultFooter from './FeedItemDefaultFooter';
import './FeedItem.css';
import { ContactSupportOutlined } from '@material-ui/icons';

const DATE_FORMAT = 'YYYY-MM-DD';

class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: "default",
            fieldErrors: {}
        };

        this.handleEditState = this.handleEditState.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCancelChange = this.handleCancelChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleEditState() {
        this.setState({formState: "edit"});
    }

    handleItemChange(e) {
        this.props.onItemChange(e.target.id, e.target.value, this.props.index);
    }

    handleCancelChange(_) {
        this.props.onCancelChange(this.props.index);
        this.setState({formState: "default", fieldErrors: {}});
    }

    handleDateChange(date, fieldName) {
        if (!this.isDateValid(date)) {
            this.setState(prevState => ({fieldErrors: {...prevState.fieldErrors, [fieldName]: 1}}));
        } else {
            if (fieldName in this.state.fieldErrors) {
                const tmp = {...this.state.fieldErrors};
                delete tmp[fieldName];
                this.setState({fieldErrors: tmp});
            }
            this.props.onItemChange(fieldName, date, this.props.index);
        }
    }

    isDateValid(date) {
        return dayjs(date, DATE_FORMAT).format(DATE_FORMAT) === date;
    }

    render() {
        const isReadOnly = this.state.formState === "default";
        const isEditMode = this.state.formState === "edit";
        const isSaveDisabled = Object.keys(this.state.fieldErrors).length !== 0;

        const header = () => {
            if (isReadOnly) {
                return <FeedItemDefaultHeader handleEditState={this.handleEditState}/>
            } else {
                return <FeedItemEditHeader handleCancelChange={this.handleCancelChange} isSaveDisabled={isSaveDisabled}/>;
            }
        };

        return (
            <Paper className="feedItem">
                {header()}
                <form>
                    <Grid container>
                        <Grid item xs>
                            <TextField
                                id="serialNumber"
                                label="Serial No."
                                defaultValue={this.props.item.serialNumber}
                                variant="outlined"
                                size="small"
                                disabled
                                className="textField"
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id="customer"
                                label="Customer"
                                value={this.props.item.customer}
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
                                id="state"
                                label="State"
                                value={this.props.item.state}
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
                                id="district"
                                label="District"
                                value={this.props.item.district}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                                onChange={this.handleItemChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <TextField
                                id="accountType"
                                label="Type"
                                value={this.props.item.accountType}
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
                                id="model"
                                label="Model"
                                value={this.props.item.model}
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
                                id="brand"
                                label="Brand"
                                value={this.props.item.brand}
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
                                id="status"
                                label="Status"
                                value={this.props.item.status}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                                onChange={this.handleItemChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <MuiPickersUtilsProvider utils={DayJsUtils}>
                                <KeyboardDatePicker
                                    id="tncDate"
                                    label="TNC Date"
                                    value={this.props.item.tncDate}
                                    format={DATE_FORMAT}
                                    variant="inline"
                                    inputVariant="outlined"
                                    margin="dense"
                                    disableToolbar
                                    autoOk
                                    className="textField"
                                    readOnly={!isEditMode}
                                    onChange={(_, date) => {this.handleDateChange(date, "tncDate");}}
                                    error={"tncDate" in this.state.fieldErrors}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs>
                            <MuiPickersUtilsProvider utils={DayJsUtils}>
                                <KeyboardDatePicker
                                    id="ppmDate"
                                    label="PPM Date"
                                    value={this.props.item.ppmDate}
                                    format={DATE_FORMAT}
                                    variant="inline"
                                    inputVariant="outlined"
                                    margin="dense"
                                    disableToolbar
                                    autoOk
                                    className="textField"
                                    readOnly={!isEditMode}
                                    onChange={(_, date) => {this.handleDateChange(date, "ppmDate");}}
                                    error={"ppmDate" in this.state.fieldErrors}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id="reportedBy"
                                label="Reported By"
                                value={this.props.item.reportedBy}
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
                                id="personInCharge"
                                label="Assignee"
                                value={this.props.item.personInCharge}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                className="textField"
                                onChange={this.handleItemChange}
                            />
                        </Grid>
                    </Grid>
                </form>
                <FeedItemDefaultFooter createdOn={this.props.item.createdOn} updatedOn={this.props.item.updatedOn}/>
            </Paper>
        );
    }
}

export default FeedItem;