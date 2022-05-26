import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Chip from '@mui/material/Chip';
import { DatePicker, LocalizationProvider } from '@mui/lab';

export default function FeedItemForm(props) {
    const isNew = props.formState === "new";
    const isReadOnly = props.formState !== "edit" && !isNew;
    const fileIsDownloading = props.formState === "downloading";
    const isSaving = props.formState === "saving";

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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            id="tncDate"
                            label="TNC Date"
                            value={props.item.tncDate}
                            format={props.dateFormat}
                            mask=""
                            readOnly={isReadOnly}
                            onChange={(date) => { 
                                props.handleDateChange(date, "tncDate"); 
                            }}
                            renderInput={(params) => 
                                <TextField
                                    className="textField"
                                    size="small"
                                    {...params} 
                                />
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            id="ppmDate"
                            label="PPM Date"
                            value={props.item.ppmDate}
                            format={props.dateFormat}
                            mask=""
                            readOnly={isReadOnly}
                            onChange={(date) => { 
                                props.handleDateChange(date, "ppmDate"); 
                            }}
                            renderInput={(params) => 
                                <TextField
                                    className="textField"
                                    size="small"
                                    {...params} 
                                />
                            }
                        />
                    </LocalizationProvider>
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
                            label={fileIsDownloading ? "Downloading..." : props.uploadedFileName}
                            clickable={props.fileIsDownloadable}
                            onClick={props.handleFileDownload}
                            onDelete={isReadOnly ? undefined : props.handleCancelFileUpload}
                            color="primary"
                            disabled={fileIsDownloading || isSaving}
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
                                    size="small"
                                    component="span"
                                    startIcon={<AttachmentIcon />}
                                    disabled={isReadOnly}
                                    className="attachment">
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