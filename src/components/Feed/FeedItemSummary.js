import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import FeedItemDefaultFooter from './FeedItemDefaultFooter';

export default function FeedItemSummary(props) {
    return (
        <div>
            <Typography>
                <Link
                    component="button" 
                    variant="body1"
                    underline="none"
                    onClick={props.onUncollapse}>
                    {props.item.serialNumber}
                </Link>
            </Typography>
            <FeedItemDefaultFooter createdOn={props.item.createdAt} updatedOn={props.item.updatedAt} footerType="collapsed"/>
        </div>
    );
}