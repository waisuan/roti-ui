import Typography from '@material-ui/core/Typography';

import './FeedItem.css';

export default function FeedItemDefaultFooter(props) {
    return (
        <div className="footer">
            <Typography variant="caption" color="textSecondary">
                Created On: {props.createdOn} | Updated On: {props.updatedOn}
            </Typography>
        </div>
    );
}