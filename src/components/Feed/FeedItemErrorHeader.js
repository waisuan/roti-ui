
import Typography from '@mui/material/Typography';

export default function FeedItemErrorHeader(props) {
    return (
        <div>
            <Typography 
                variant="caption" 
                color="error" 
                align="center" 
                display="block" 
                gutterBottom>
                Oops, something went wrong...
            </Typography>
        </div>
    );
}

