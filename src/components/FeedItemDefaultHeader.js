import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TimelineIcon from '@material-ui/icons/Timeline';

import './FeedItem.css';

export default function FeedItemDefaultHeader(props) {
    return (
        <div className="header">
            <Tooltip title="Edit">
                <IconButton size="small" color="primary" aria-label="edit" onClick={props.handleEditState}>
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
}