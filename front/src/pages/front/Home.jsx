import { Carousel } from "react-bootstrap";
import slider1 from "/slider-1.jpg";
import slider2 from "/slider-2.jpg";
import { ProductList } from "../../components";
import { useEffect, useState } from "react";
import http from "../../http";

export const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    setLoading(true);
    http
      .get("product/latest")
      .then(({ data }) => {
        console.log(data);
        setLatest(data);
        return http.get("product/featured");
      })
      .then(({ data }) => {
        setFeatured(data);
        return http.get("product/top-selling");
      })
      .then(({ data }) => {
        setTopSelling(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="col-12">
      <main className="row">
        <div className="col-12 px-0">
          <Carousel>
            <Carousel.Item>
              <img src={slider1} alt="image-1" className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={slider2} alt="image-2" className="d-block w-100" />
            </Carousel.Item>
          </Carousel>
        </div>
        <ProductList
          title="Featured Products"
          products={featured}
          loading={loading}></ProductList>
        <div className="col-12">
          <hr />
        </div>
        <ProductList
          title="Latest Products"
          products={latest}
          loading={loading}
          latest></ProductList>
        <div className="col-12">
          <hr />
        </div>
        <ProductList
          title="Top Selling Products"
          products={topSelling}
          loading={loading}></ProductList>
      </main>
    </div>
  );
};
