import Typography from '@material-ui/core/Typography';

import './FeedItem.css';

export default function FeedItemDefaultFooter(props) {
    const footerType = props.footerType === "uncollapsed" ? "uncollapsed-footer" : "collapsed-footer";
    const createdOnFooter = <span className="footer-left">{props.createdOn}</span>;
    const updatedOnFooter = <span className="footer-right">{props.updatedOn}</span>;

    return (
        <div className={footerType}>
            <Typography variant="caption" color="textSecondary">
                Created On: {createdOnFooter} | Updated On: {updatedOnFooter}
            </Typography>
        </div>
    );
}