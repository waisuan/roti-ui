import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';

export default function FeedLogRowActions(props) {
    return (
        <TableRow selected={true}>
            <TableCell colSpan={6} align="center">
                <Tooltip title="Edit">
                    <IconButton size="small" color="primary" onClick={props.handleEdit}>
                        <EditIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                        <DeleteForeverIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                    <IconButton size="small" color="secondary" onClick={props.handleCancel}>
                        <CancelIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}