import Typography from '@mui/material/Typography';

export default function FeedItemDeleted(props) {
    return (
        <div>
            <Typography>
                <s>{props.item}</s>
            </Typography>
            <Typography variant="caption" color="textSecondary">
                (Reload the page to make this disappear)
            </Typography>
        </div>
    );
}