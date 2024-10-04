import { Carousel } from "react-bootstrap"
import slider1 from "/slider-1.jpg"
import slider2 from "/slider-2.jpg"
import slider3 from "/slider-3.jpg"
import { ProductList } from "../../components/ProductList"
import { useEffect, useState } from "react"
import http from "../../http"

export const Home = () => {
    const [featured, setFeatured] = useState([])
    const [latest, setLatest] = useState([])
    const [topSelling, setTopSelling] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('product/latest')
            .then(({data}) => {
                setLatest(data)

                return http.get('product/featured')
            })
            .then(({data}) => {
                setFeatured(data)

                return http.get('product/top-selling')
            })
            .then(({data}) => {
                setTopSelling(data)
            })
            .catch(err => {})
            .finally(() => setLoading(false))
            
    }, [])


    return <div className="col-12">
    <main className="row">

        <div className="col-12 px-0">
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src={slider1} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={slider2} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={slider3} />
                </Carousel.Item>
            </Carousel>
        </div>

        <ProductList title="Featured Products" products={featured} loading={loading} />

        <div className="col-12">
            <hr />
        </div>

        <ProductList title="Latest Products" products={latest} loading={loading} latest />

        <div className="col-12">
            <hr />
        </div>

        <ProductList title="Top Selling Products" products={topSelling} loading={loading} />


        <div className="col-12 py-3 bg-light d-sm-block d-none">
            <div className="row">
                <div className="col-lg-3 col ms-auto large-holder">
                    <div className="row">
                        <div className="col-auto ms-auto large-icon">
                            <i className="fas fa-money-bill"></i>
                        </div>
                        <div className="col-auto me-auto large-text">
                            Best Price
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col large-holder">
                    <div className="row">
                        <div className="col-auto ms-auto large-icon">
                            <i className="fas fa-truck-moving"></i>
                        </div>
                        <div className="col-auto me-auto large-text">
                            Fast Delivery
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col me-auto large-holder">
                    <div className="row">
                        <div className="col-auto ms-auto large-icon">
                            <i className="fas fa-check"></i>
                        </div>
                        <div className="col-auto me-auto large-text">
                            Genuine Products
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
}