import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DayJsUtils from '@date-io/dayjs';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Chip from '@material-ui/core/Chip';

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
                        onChange={props.handleItemChange}
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
                        <DatePicker
                            id="tncDate"
                            label="TNC Date"
                            value={props.item.tncDate}
                            format={props.dateFormat}
                            variant="inline"
                            inputVariant="outlined"
                            margin="dense"
                            autoOk
                            className="textField"
                            InputProps={{ readOnly: isReadOnly }}
                            readOnly={isReadOnly}
                            onChange={(date) => { 
                                props.handleDateChange(date, "tncDate"); 
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs>
                    <MuiPickersUtilsProvider utils={DayJsUtils}>
                        <DatePicker
                            id="ppmDate"
                            label="PPM Date"
                            value={props.item.ppmDate}
                            format={props.dateFormat}
                            variant="inline"
                            inputVariant="outlined"
                            margin="dense"
                            autoOk
                            className="textField"
                            InputProps={{ readOnly: isReadOnly }}
                            readOnly={isReadOnly}
                            onChange={(date) => { 
                                props.handleDateChange(date, "ppmDate"); 
                            }}
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="additionalNotes"
                        label="Notes"
                        value={props.item.additionalNotes}
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                        className="textField"
                        onChange={props.handleItemChange}
                    />
                </Grid>
                <Grid item xs>
                    { props.uploadedFileName ? 
                        <Chip 
                            icon={<AttachmentIcon />}
                            size="small" 
                            label={props.uploadedFileName}
                            onDelete={props.handleCancelFileUpload} 
                            color="primary" 
                            disabled={isReadOnly}
                            className="attachment"
                        />
                        :
                        <div>
                            <input
                                id="form-item-attachment-button"
                                type="file"
                                disabled={isReadOnly}
                                style={{display: 'none'}}
                                accept="application/pdf"
                                onChange={props.handleFileUpload}
                            />
                            <label htmlFor="form-item-attachment-button">
                                <Button
                                    variant="outlined"
                                    color="default"
                                    size="small"
                                    component="span"
                                    startIcon={<AttachmentIcon />}
                                    disabled={isReadOnly}
                                    className="attachment"
                                >
                                    Attachment
                                </Button>
                            </label>
                        </div>
                    }
                </Grid>
            </Grid>
        </form>
    );
}