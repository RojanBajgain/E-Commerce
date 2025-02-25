import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../http"
import { ProductCard } from "../../components/ProductCard"
import { Loading } from "../../components/Loading"
import { Pagination } from "react-bootstrap"

export const Brand = () => {
    const [brand, setBrand] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(24)
    const [totalPages, setTotalPages] = useState(1)
    const [paginated, setPaginated] = useState([])
    const [pageLink, setPageLink] = useState([])

    const params = useParams()

    useEffect(() => {
        setLoading(true)

        http.get(`brand/${params.id}`)
            .then(({data}) => {
                setBrand(data)

                return http.get(`brand/${params.id}/products`)
            })
            .then(({data}) => setProducts(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }, [params.id])

    useEffect(() => {
        let temp = (currentPage - 1) * perPage
        setOffset(temp)
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1)

        let temp = [...products].splice(offset, perPage)

        let total = Math.ceil(products.length / perPage)

        setPaginated(temp)
        setTotalPages(total)

    }, [perPage, products])

    useEffect(() => {
        let temp = [...products].splice(offset, perPage)
        setPaginated(temp)
    }, [offset, products])

    useEffect(() => {
        let temp = [<Pagination.Prev disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} />]
        for(let i = 1; i <= totalPages; i++) {
            temp.push(<Pagination.Item key={i} active={i == currentPage} onClick={() => setCurrentPage(i)}>{i}</Pagination.Item>)
        }
        temp.push(<Pagination.Next disabled={currentPage == totalPages} onClick={() => setCurrentPage(currentPage + 1)} />)

        setPageLink(temp)
    }, [totalPages, currentPage])


    return loading ? <Loading /> : <div className="col-12">
            <main className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 py-3">
                            <div className="row">
                                <div className="col-12 text-center text-uppercase">
                                    <h2>{brand.name}</h2>
                                </div>
                            </div>
                            <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2 justify-content-center">

                                {products.map(product => <ProductCard product={product} key={product._id} />)}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-center">
                {totalPages > 1 ? <Pagination>
                    {pageLink.map(link => link)}
                    </Pagination> : null}
                </div>

            </main>
        </div>
}