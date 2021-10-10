import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Typography } from '@material-ui/core';

export default function FeedControlBar(props) {
    return (
        <div className="feedControlBar">
            <div className="feedItemAdd">
                <Tooltip title="Add">
                    <span>
                        <IconButton 
                            aria-label="add-item"
                            color="primary"
                            size="small"
                            onClick={props.onAdd}
                            disabled={props.isAddDisabled}>
                            <PlaylistAddIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <span>|</span>
                <Button size="small">
                    Expand
                </Button>
                <span>|</span>
                <Button size="small">
                    Collapse
                </Button>
            </div>
            <div className="feedItemControl">
                <Pagination 
                    size="small"
                    color="primary"
                    count={props.pageCount}
                    showFirstButton
                    showLastButton 
                    onChange={props.onChangePage}/>
                <div style={{"float": "right"}}>
                    <Typography variant="caption">
                        {props.currPageStats}
                    </Typography>
                </div>
            </div>
        </div>
    );
}