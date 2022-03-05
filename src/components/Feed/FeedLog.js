import { Component } from "react";
import { withRouter } from "react-router-dom";

class FeedLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedItemId: this.props.match.params.id
        }
    }

    render() {
        return <h1>{this.state.feedItemId}</h1>;
    }
}

export default withRouter(FeedLog);