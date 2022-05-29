import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';

export default function FeedDeleteHeader(props) {
    return (
        <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
                Are you sure?
            </Typography>
            <Tooltip title="Save">
                <IconButton size="small" color="success" aria-label="save" onClick={props.handleSaveDelete}>
                    <CheckCircleIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
                <IconButton size="small" color="secondary" aria-label="cancel"  onClick={props.handleCancel}>
                    <CancelIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </Box>
    );
}