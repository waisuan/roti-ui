import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import './FeedItem.css';

export default function FeedItemDeleteHeader(props) {
    return (
        <div className="header-right">
            <Typography variant="caption" color="textSecondary">
                Are you sure?
            </Typography>
            <Tooltip title="Save">
                <IconButton size="small" color="primary" aria-label="save" onClick={props.handleSaveDelete}>
                    <CheckCircleIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
                <IconButton size="small" color="secondary" aria-label="cancel"  onClick={props.handleCancel}>
                    <CancelIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </div>
    );
}