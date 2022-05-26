import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Typography } from '@mui/material';

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
                {/* TODO */}
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
                    page={props.currPage}
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