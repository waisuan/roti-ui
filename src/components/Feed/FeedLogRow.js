import Tooltip from "@mui/material/Tooltip";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from "@mui/material/IconButton";
import AttachmentIcon from '@mui/icons-material/Attachment';

export default function FeedLogRow(props) {
    const row = props.row;

    return (
        <Tooltip title={`Last updated: ${row.updatedAt}`} placement="right">
            <TableRow hover={true} selected={false} onClick={props.handleRowClick}>
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
    );
}