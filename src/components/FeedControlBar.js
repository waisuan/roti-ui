import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

export default function FeedControlBar(props) {
    return (
        <div className="feedControlBar">
            <div className="feedItemAdd">
                <Tooltip title="Add">
                    <IconButton aria-label="add-item" color="primary" size="small" onClick={props.onAdd}>
                        <PlaylistAddIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="feedItemControl">
                <Button size="small">
                    Expand
                </Button>
                <span>|</span>
                <Button size="small">
                    Collapse
                </Button>
            </div>
        </div>
    );
}