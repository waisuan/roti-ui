import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import FeedItemDefaultFooter from './FeedItemDefaultFooter';
import './FeedItem.css';

export default function FeedItemCollapsed(props) {
    return (
        <Grid container>
            <Grid item xs>
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
                    <FeedItemDefaultFooter createdOn={props.item.createdOn} updatedOn={props.item.updatedOn} footerType="collapsed"/>
                </div>
            </Grid>
        </Grid>
    );
}