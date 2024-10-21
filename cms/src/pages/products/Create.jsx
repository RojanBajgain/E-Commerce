import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormField, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Create = () => {
  const [form, setForm] = useState({ status: true, featured: false });
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoadingPage(true);
    http
      .get("cms/categories")
      .then(({ data }) => {
        setCategories(data);
        return http.get("cms/brands");
      })
      .then(({ data }) => setBrands(data))
      .catch(err => {})
      .finally(() => setLoadingPage(false));
  }, []);

  useEffect(() => {
    if (form.images && form.images.length) {
      let list = [];
      let i = 0;
      for (let image of form.images) {
        list.push(
          <Col lg={4} key={i++} className="mt-3">
            <img src={URL.createObjectURL(image)} className="img-fluid" />
          </Col>
        );
      }
      setImgPreview(list);
    }
  }, [form.images]);

  function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    const fd = new FormData();
    for (let k in form) {
      if (k === "images") {
        for (let img of form.images) {
          fd.append(k, img);
        }
      } else {
        fd.append(k, form[k]);
      }
    }
    http
      .post("cms/products", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => navigate("/products"))
      .catch(err => {})
      .finally(() => setLoading(false));
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col lg={9} className="mx-auto">
              <h1>Add Product</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={9} className="mx-auto">
              {loadingPage ? (
                <Loading></Loading>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <FormField label="Name" title="name">
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      onChange={ev => setInForm(ev, form, setForm)}
                      required></Form.Control>
                  </FormField>
                  <FormField label="Summary" title="summary">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      onChange={data =>
                        setForm({
                          ...form,
                          summary: data,
                        })
                      }></ReactQuill>
                  </FormField>
                  <FormField label="Description" title="description">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      onChange={data =>
                        setForm({
                          ...form,
                          description: data,
                        })
                      }></ReactQuill>
                  </FormField>
                  <FormField label="Price" title="price">
                    <Form.Control
                      type="number"
                      name="price"
                      id="price"
                      onChange={ev => setInForm(ev, form, setForm)}
                      required></Form.Control>
                  </FormField>
                  <FormField label="Dis. Price" title="discounted_price">
                    <Form.Control
                      type="number"
                      name="discounted_price"
                      id="discounted_price"
                      onChange={ev =>
                        setInForm(ev, form, setForm)
                      }></Form.Control>
                  </FormField>
                  <FormField label="Images" title="images">
                    <Form.Control
                      type="file"
                      name="images"
                      id="images"
                      accept="image/*"
                      multiple="yes"
                      required
                      onChange={ev =>
                        setForm({
                          ...form,
                          images: ev.target.files,
                        })
                      }></Form.Control>
                    {imgPreview.length ? (
                      <Row>{imgPreview.map(image => image)}</Row>
                    ) : null}
                  </FormField>
                  <FormField title="category_id" label="Category">
                    <Form.Select
                      name="category_id"
                      id="category_id"
                      onChange={ev => setInForm(ev, form, setForm)}
                      required>
                      <option value="">Select a Category</option>
                      {categories.map(category => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FormField>
                  <FormField title="brand_id" label="Brand">
                    <Form.Select
                      name="brand_id"
                      id="brand_id"
                      onChange={ev => setInForm(ev, form, setForm)}
                      required>
                      <option value="">Select a Brand</option>
                      {brands.map(brand => (
                        <option value={brand._id} key={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FormField>

                  <FormField title="status" label="Status">
                    <br />
                    <Switch
                      name="status"
                      id="status"
                      checked={form.status}
                      onChange={() =>
                        setForm({
                          ...form,
                          status: !form.status,
                        })
                      }></Switch>
                  </FormField>
                  <FormField title="featured" label="Featured">
                    <br />
                    <Switch
                      name="featured"
                      id="featured"
                      checked={form.featured}
                      onChange={() =>
                        setForm({
                          ...form,
                          featured: !form.featured,
                        })
                      }></Switch>
                  </FormField>
                  <div className="mb-3">
                    <SubmitBtn loading={loading}></SubmitBtn>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
