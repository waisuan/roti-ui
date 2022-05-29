import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';

export default function FeedEditHeader(props) {
    return (
        <Box sx={{ textAlign: 'right' }}>
            {!props.isNew && 
                <Typography variant="caption" color="text.secondary">
                    Editing...
                </Typography>
            }
            {props.isNew && 
                <Typography variant="caption" color="text.secondary">
                    Creating...
                </Typography>
            }
            <Tooltip title="Save">
                <IconButton size="small" color="success" aria-label="save" disabled={props.isSaveDisabled} onClick={props.handleSaveEdit}>
                    <SaveIcon fontSize="inherit"/>
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