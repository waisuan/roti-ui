import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";

export default function FeedPagination(props) {
    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Route>
          {({ location }) => {
            const query = new URLSearchParams(location.search);
            const page = parseInt(query.get('page') || '1', 10);
            return (
              <Pagination
                page={page}
                count={10}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            );
          }}
        </Route>
      </MemoryRouter>
    );
}