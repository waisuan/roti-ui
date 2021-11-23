import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

export default function FeedItemEditHeader(props) {
    return (
        <div className="header-right">
            {!props.isNew && 
                <Typography variant="caption" color="textSecondary">
                    Editing...
                </Typography>
            }
            <Tooltip title="Save">
                <span>
                    <IconButton size="small" color="primary" aria-label="save" disabled={props.isSaveDisabled} onClick={props.handleSaveEdit}>
                        <SaveIcon fontSize="inherit"/>
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Cancel">
                <IconButton size="small" color="secondary" aria-label="cancel"  onClick={props.handleCancel}>
                    <CancelIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </div>
    );
}