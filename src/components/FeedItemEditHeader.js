import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import './FeedItem.css';

export default function FeedItemEditHeader(props) {
    return (
        <div className="header">
            <Typography variant="caption" color="textSecondary">
                Editing...
            </Typography>
            <Tooltip title="Save">
                <IconButton size="small" color="primary" aria-label="save" disabled={props.isSaveDisabled}>
                    <SaveIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
                <IconButton size="small" color="secondary" aria-label="cancel"  onClick={props.handleCancelChange}>
                    <CancelIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </div>
    );
}