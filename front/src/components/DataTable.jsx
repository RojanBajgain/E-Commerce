import moment from "moment";
import { useEffect, useState } from "react";
import { Form, Row, Table, Col, Pagination } from "react-bootstrap";

export const DataTable = ({ data = [], searchable = [], sortable = [] }) => {
  const [term, setTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [paginated, setPaginated] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    if (term.length) {
      const temp = data.filter(item => {
        for (let key of searchable) {
          if (`${item[key]}`.toLowerCase().includes(term.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      setFiltered(temp);
    } else {
      setFiltered(data);
    }
    setSortBy("");
    setDirection("desc");
    setCurrentPage(1);
  }, [term]);

  useEffect(() => {
    if (sortBy.length) {
      let sorted = [...filtered].sort((a, b) => {
        if (isNaN(parseFloat(a[sortBy])) || isNaN(parseFloat(b[sortBy]))) {
          if (moment(a[sortBy]).isValid() && moment(b[sortBy]).isValid()) {
            return moment(a[sortBy]) - moment(b[sortBy]);
          } else {
            let x = a[sortBy].toLowerCase();
            let y = b[sortBy].toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          }
        } else {
          return a[sortBy] - b[sortBy];
        }
      });
      if (direction == "desc") {
        sorted.reverse();
      }
      setFiltered(sorted);
      setCurrentPage(1);
    }
  }, [sortBy, direction]);

  useEffect(() => {
    let temp = (currentPage - 1) * perPage;
    setOffset(temp);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    let temp = [...filtered].splice(offset, perPage);
    let total = Math.ceil(filtered.length / perPage);
    setPaginated(temp);
    setTotalPages(total);
  }, [perPage, filtered]);

  useEffect(() => {
    let temp = [...filtered].splice(offset, perPage);
    setPaginated(temp);
  }, [offset, filtered]);

  useEffect(() => {
    let temp = [
      <Pagination.Prev
        disabled={currentPage == 1}
        onClick={() => setCurrentPage(currentPage - 1)}></Pagination.Prev>,
    ];
    for (let i = 1; i <= totalPages; i++) {
      temp.push(
        <Pagination.Item
          key={i}
          active={i == currentPage}
          onClick={() => {
            setCurrentPage(i);
          }}>
          {i}
        </Pagination.Item>
      );
    }
    temp.push(
      <Pagination.Next
        disabled={currentPage == totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}></Pagination.Next>
    );
    setPageLink(temp);
  }, [totalPages, currentPage]);

  const handleSort = key => {
    if (sortable.includes(key)) {
      if (sortBy == key) {
        if (direction == "desc") {
          setDirection("asc");
        } else {
          setDirection("desc");
        }
      } else {
        setDirection("desc");
      }
      setSortBy(key);
    }
  };
  return (
    <Row>
      <Col lg={3} className="ms-auto mb-3">
        <Form.Control
          type="search"
          placeholder="Search......"
          onChange={ev => setTerm(ev.target.value)}></Form.Control>
      </Col>
      <Col xs={12}>
        {paginated.length ? (
          <>
            <div className="table-responsive">
              <Table striped hover size="sm">
                <thead className="table-dark">
                  <tr>
                    {Object.keys(paginated[0]).map((k, i) => (
                      <th
                        key={i}
                        className={sortable.includes(k) ? "sortable" : null}
                        onClick={() => handleSort(k)}>
                        {k}
                        {sortBy == k ? (
                          <i
                            className={`fa-solid fa-chevron-${
                              direction == "asc" ? "up" : "down"
                            } ms-3`}></i>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((item, i) => (
                    <tr key={i}>
                      {Object.values(item).map((v, j) => (
                        <td key={j}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {totalPages > 1 ? (
              <Pagination>{pageLink.map(link => link)}</Pagination>
            ) : null}
          </>
        ) : (
          <h4 className="fst-italic text-muted">No Data Found</h4>
        )}
      </Col>
    </Row>
  );
};
