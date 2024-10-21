import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../../http";
import { Pagination } from "react-bootstrap";
import { Loading, ProductCard } from "../../components";

export const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginated, setPaginated] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  const [params] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    http
      .get(`search`, {
        params: { term: params.get("term") },
      })
      .then(({ data }) => {
        setProducts(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, [params.get("term")]);

  useEffect(() => {
    let temp = (currentPage - 1) * perPage;
    setOffset(temp);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    let temp = [...products].splice(offset, perPage);
    let total = Math.ceil(products.length / perPage);
    setPaginated(temp);
    setTotalPages(total);
  }, [perPage, products]);

  useEffect(() => {
    let temp = [...products].splice(offset, perPage);
    setPaginated(temp);
  }, [offset, products]);

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

  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="col-12">
      <main className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 py-3">
              <div className="row">
                <div className="col-12 text-center text-uppercase">
                  <h2>Search : {params.get("term")}</h2>
                </div>
              </div>
              <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2 justify-content-center">
                {paginated.map(product => (
                  <ProductCard
                    product={product}
                    key={product._id}></ProductCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          {totalPages > 1 ? (
            <Pagination>{pageLink.map(link => link)}</Pagination>
          ) : null}
        </div>
      </main>
    </div>
  );
};
