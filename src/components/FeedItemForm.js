import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DayJsUtils from '@date-io/dayjs';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

export default function FeedItemForm(props) {
    const isNew = props.formState === "new";
    const isReadOnly = props.formState !== "edit" && !isNew;

    return (
        <form>
            <Grid container>
                <Grid item xs>
                    <TextField
                        id="serialNumber"
                        label="Serial No."
                        defaultValue={props.item.serialNumber}
                        variant="outlined"
                        size="small"
                        disabled={!isNew}
                        className="textField"
                        required={isNew}
                        autoFocus={isNew}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="customer"
                        label="Customer"
                        value={props.item.customer}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="state"
                        label="State"
                        value={props.item.state}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="district"
                        label="District"
                        value={props.item.district}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs>
                    <TextField
                        id="accountType"
                        label="Type"
                        value={props.item.accountType}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="model"
                        label="Model"
                        value={props.item.model}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="brand"
                        label="Brand"
                        value={props.item.brand}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="status"
                        label="Status"
                        value={props.item.status}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs>
                    <MuiPickersUtilsProvider utils={DayJsUtils}>
                        <KeyboardDatePicker
                            id="tncDate"
                            label="TNC Date"
                            value={props.item.tncDate}
                            format={props.dateFormat}
                            variant="inline"
                            inputVariant="outlined"
                            margin="dense"
                            disableToolbar
                            autoOk
                            className="textField"
                            readOnly={isReadOnly}
                            onChange={(_, date) => { props.handleDateChange(date, "tncDate"); }}
                            error={"tncDate" in props.fieldErrors}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs>
                    <MuiPickersUtilsProvider utils={DayJsUtils}>
                        <KeyboardDatePicker
                            id="ppmDate"
                            label="PPM Date"
                            value={props.item.ppmDate}
                            format={props.dateFormat}
                            variant="inline"
                            inputVariant="outlined"
                            margin="dense"
                            disableToolbar
                            autoOk
                            className="textField"
                            readOnly={isReadOnly}
                            onChange={(_, date) => { props.handleDateChange(date, "ppmDate"); }}
                            error={"ppmDate" in props.fieldErrors}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="reportedBy"
                        label="Reported By"
                        value={props.item.reportedBy}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="personInCharge"
                        label="Assignee"
                        value={props.item.personInCharge}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
            </Grid>
        </form>
    );
}