import { Loading } from "./Loading";
import { ProductCard } from "./ProductCard";

export const ProductList = ({
  title,
  products,
  latest = false,
  loading = false,
}) => {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 py-3">
          <div className="row">
            <div className="col-12 text-center text-uppercase">
              <h2>{title}</h2>
            </div>
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="row row-cols-lg-4 row-cols-sm-2 justify-content-center">
              {products.map(product => (
                <ProductCard
                  product={product}
                  latest={latest}
                  key={product._id}></ProductCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
