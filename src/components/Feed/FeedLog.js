import { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class FeedLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedItemId: this.props.match.params.id
        }
    }

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
      

    render() {
        const rows = [
            this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            this.createData('Eclair', "02/12/2022", 16.0, 24, 6.0),
            this.createData('Cupcake', 305, 3.7, "Evan Sia", 4.3),
            this.createData('Gingerbread', 356, 16.0, 49, "Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
          ];

        return (
            <div>
                <h1>{this.state.feedItemId}</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Work Order No.</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Reported By</TableCell>
                                <TableCell>Action Taken</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} hover={true} selected={false}>
                                    <TableCell component="th" scope="row" style={{ width: "15%"}}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: "15%"}}>
                                        {row.calories}
                                    </TableCell>
                                    <TableCell style={{ width: "10%"}}>
                                        {row.fat}
                                    </TableCell>
                                    <TableCell style={{ width: "15%"}}>
                                        {row.carbs}
                                    </TableCell>
                                    <TableCell style={{ width: "45%" }}>
                                        {row.protein}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            );
    }
}

export default withRouter(FeedLog);