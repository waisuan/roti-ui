import FeedItemSummary from './FeedItemSummary';
import FeedItemDeleted from './FeedItemDeleted';

export default function FeedItemCollapsed(props) {
    return (
        <div className="collapsed">
            { props.item.isDeleted ? 
                <FeedItemDeleted item={props.item.serialNumber}/>
            :
                <FeedItemSummary item={props.item} onUncollapse={props.onUncollapse}/>
            }
        </div>
    );
}