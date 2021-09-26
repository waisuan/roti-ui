import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import FeedItemDefaultFooter from './FeedItemDefaultFooter';

export default function FeedItemCollapsed(props) {
    return (
        <div className="collapsed">
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