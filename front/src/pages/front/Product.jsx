import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { imgURL } from "../../lib"
import { Loading } from "../../components/Loading"
import http from "../../http"
import { ProductList } from "../../components/ProductList"
import { useSelector } from "react-redux"
import { CartBtn, SubmitBtn } from "../../components"

export const Product = () => {
    const [imgPreview, setImgPreview] = useState('')
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [similar, setSimilar] = useState([])
    const [form, setForm] = useState({})
    const [rating, setRating] = useState(0)
    const [qty, setQty] = useState(1)
    const [stars, setStars] = useState({'1': 0, '2': 0, '3': 0, '4': 0, '5': 0 })

    const user = useSelector(state => state.user.value)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        http.get(`product/${params.id}`)
            .then(({data}) => {
                setProduct(data)
                setImgPreview(data.images[0])
                return http.get(`product/${params.id}/similar`)
            })
            .then(({data}) => setSimilar(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }, [params.id])

    useEffect(() => {
        if(product.reviews && product.reviews.length) {
            let sum = 0;
            let temp = {'1':0, '2': 0, '3': 0, '4': 0, '5': 0 };

            for(let review of product.reviews) {
                sum += review.rating
                temp[`${review.rating}`] += 1
            }

            setRating(sum / product.reviews.length)
            setStars({
                '1': temp['1'] / product.reviews.length * 100,
                '2': temp['2'] / product.reviews.length * 100,
                '3': temp['3'] / product.reviews.length * 100,
                '4': temp['4'] / product.reviews.length * 100,
                '5': temp['5'] / product.reviews.length * 100,
            })
        }
    }, [product.reviews])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post(`product/${params.id}/review`, form)
            .then(() => http.get(`product/${params.id}`))
            .then(({data}) => {
                setProduct(data)
                setImgPreview(data.images[0])
                ev.target.reset()
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }


    return loading ? <Loading/> : Object.keys(product).length ?  <div className="col-12">
    <main className="row">
        <div className="col-12 bg-white py-3 my-3">
            <div className="row">

                <div className="col-lg-5 col-md-12 mb-3">
                    <div className="col-12 mb-3">
                        <div className="img-large border" style={{
                            backgroundImage: `url('${imgURL(imgPreview)}')`
                        }}></div>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {product.images ? product.images.map((image, i) => <div className="col-sm-2 col-3" key={i}>
                                <div className="img-small border" style={{
                                    backgroundImage: `url('${imgURL(image)}')`
                                    }} onMouseEnter={() => setImgPreview(image)}></div>
                            </div>) : null}
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-9">
                    <div className="col-12 product-name large">
                        {product.name}
                        <small>By <Link to={`/brand/${product.brand_id}`}>{product.brand.name}</Link></small>
                    </div>
                    <div className="col-12 px-0">
                        <hr />
                    </div>
                    <div className="col-12"dangerouslySetInnerHTML={{__html: product.summary}}/>
                </div>

                <div className="col-lg-2 col-md-3 text-center">
                    <div className="col-12 sidebar h-100">
                        <div className="row">
                            <div className="col-12">
                            {product.discounted_price ? <><span className="detail-price">
                                Rs. {product.discounted_price}
                            </span>
                                <span className="detail-price-old">
                                Rs. {product.price}
                            </span></>: <span className="detail-price-old">
                                Rs. {product.price}
                            </span>}
                            </div>
                            <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                                <div className="mb-3">
                                    <label htmlFor="qty">Quantity</label>
                                    <input type="number" id="qty" min="1" value={qty} className="form-control" required onChange={ev => setQty(parseInt(ev.target.value))}/>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <CartBtn product={product} qty={qty}/>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-outline-secondary btn-sm" type="button"><i className="fas fa-heart me-2"></i>Add to wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div className="col-12 mb-3 py-3 bg-white text-justify">
            <div className="row">

                <div className="col-md-7">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 text-uppercase">
                                <h2><u>Details</u></h2>
                            </div>
                            <div className="col-12" id="details" dangerouslySetInnerHTML={{__html: product.description}}>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="col-12 px-md-4 sidebar h-100">

                        <div className="row">
                            <div className="col-12 mt-md-0 mt-3 text-uppercase">
                                <h2><u>Ratings & Reviews</u></h2>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-sm-4 text-center">
                                        <div className="row">
                                            <div className="col-12 average-rating">
                                                {rating.toFixed(1)}
                                            </div>
                                            <div className="col-12">
                                                of {product.reviews.length} reviews
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <ul className="rating-list mt-3">
                                            <li>
                                                <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{width: `${stars['5']}%`}}>{stars['5'].toFixed(1)}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    5<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                            <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{width: `${stars['4']}%`}}>{stars['4'].toFixed(1)}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    4<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                            <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{width: `${stars['3']}%`}}>{stars['3'].toFixed(1)}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    3<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                            <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{width: `${stars['2']}%`}}>{stars['2'].toFixed(1)}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    2<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                            <li>
                                            <div className="progress">
                                                    <div className="progress-bar bg-dark" role="progressbar" style={{width: `${stars['1']}%`}}>{stars['1'].toFixed(1)}%</div>
                                                </div>
                                                <div className="rating-progress-label">
                                                    1<i className="fas fa-star ms-1"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 px-md-3 px-0">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <h4>Add Review</h4>
                            </div>
                            <div className="col-12">
                                {Object.keys(user).length ? <form>
                                    <div className="mb-3">
                                        <textarea name="comment" className="form-control" placeholder="Give your review" required onChange={ev => setForm({
                                            ...form,
                                            'comment': ev.target.value,
                                        })}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex ratings justify-content-end flex-row-reverse">
                                            <input type="radio" value="5" name="rating" id="rating-5" required checked={form.rating == 5} onClick={() => setForm({
                                                ...form,
                                                rating: 5,
                                            })}/>
                                            <label htmlFor="rating-5"></label>

                                            <input type="radio" value="4" name="rating" id="rating-4" required checked={form.rating == 4} onClick={() => setForm({
                                                ...form,
                                                rating: 4,
                                            })}/>
                                            <label htmlFor="rating-4"></label>
                                            
                                            <input type="radio" value="3" name="rating" id="rating-3" required checked={form.rating == 3} onClick={() => setForm({
                                                ...form,
                                                rating: 3,
                                            })}/>
                                            <label htmlFor="rating-3"></label>

                                            <input type="radio" value="2" name="rating" id="rating-2" required checked={form.rating == 2} onClick={() => setForm({
                                                ...form,
                                                rating: 2,
                                            })}/>
                                            <label htmlFor="rating-2"></label>

                                            <input type="radio" value="1" name="rating" id="rating-1" required checked={form.rating == 1} onClick={() => setForm({
                                                ...form,
                                                rating: 1,
                                            })}/>
                                            <label htmlFor="rating-1"></label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <SubmitBtn label="Add Comment" icon="fa-comment-dots" />
                                    </div>
                                </form> : <div className="col-12 text-center fst-italic py-2 px-3 mb-3 bg-gray">
                                        Please <Link to="/login">Login</Link> to add your review.
                                    </div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 px-md-3 px-0">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">

                                <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                                    <div className="row">
                                        <div className="col-12">
                                            <strong className="me-2">Steve Rogers</strong>
                                            <small>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </small>
                                        </div>
                                        <div className="col-12">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ullamcorper quam, non congue odio.
                                            <br />
                                            Fusce ligula augue, faucibus sed neque non, auctor rhoncus enim. Sed nec molestie turpis. Nullam accumsan porttitor rutrum. Curabitur eleifend venenatis volutpat.
                                            <br />
                                            Aenean faucibus posuere vehicula.
                                        </div>
                                        <div className="col-12">
                                            <small>
                                                <i className="fas fa-clock me-2"></i>5 hours ago
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                                    <div className="row">
                                        <div className="col-12">
                                            <strong className="me-2">Bucky Barns</strong>
                                            <small>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </small>
                                        </div>
                                        <div className="col-12">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ullamcorper quam, non congue odio.
                                            <br />
                                            Aenean faucibus posuere vehicula.
                                        </div>
                                        <div className="col-12">
                                            <small>
                                                <i className="fas fa-clock me-2"></i>5 hours ago
                                            </small>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <ProductList products={similar} title="Similar Products" />

    </main>
</div> : null
}