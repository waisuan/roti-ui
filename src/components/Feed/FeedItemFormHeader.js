import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';

export default function FeedItemFormHeader(props) {
    return (
        <Box>
            <Box sx={{ float: 'left' }}>
                <Tooltip title="Collapse">
                    <IconButton size="small" aria-label="collapse" onClick={props.handleCollapse}>
                        <ExpandLessIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Tooltip title="Edit">
                    <IconButton size="small" color="primary" aria-label="edit" onClick={props.handleEditState}>
                        <EditIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton size="small" color="error" aria-label="delete" onClick={props.handleDelState}>
                        <DeleteForeverIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Log">
                    <IconButton size="small" aria-label="timeline" onClick={props.redirectToLog}>
                        <TimelineIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>

    );
}