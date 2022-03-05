import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export default function FeedItemFormHeader(props) {
    return (
        <div>
            <div className="header-left">
                <Tooltip title="Collapse">
                    <IconButton size="small" aria-label="collapse" onClick={props.handleCollapse}>
                        <ExpandLessIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="header-right">
                <Tooltip title="Edit">
                    <IconButton size="small" color="primary" aria-label="edit" onClick={props.handleEditState}>
                        <EditIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton size="small" color="secondary" aria-label="delete" onClick={props.handleDelState}>
                        <DeleteForeverIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Log">
                    <IconButton size="small" aria-label="timeline" onClick={props.redirectToLog}>
                        <TimelineIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>

    );
}