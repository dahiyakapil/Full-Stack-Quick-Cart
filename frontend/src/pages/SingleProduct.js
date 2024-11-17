import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import watch from "../images/watch.jpg";
import Color from "../components/Color";
import { BiGitCompare } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";

const SingleProduct = () => {
  const [orderedProuct, setOrderedProduct] = useState(true);

  const props = {
    width: 900,
    height: 600,
    zoomWidth: 500,
    img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg",
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={"Product Name"} />
      <Container class1="main-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div>
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  Xiaomi Redmi Note 12 Pro 5G 128 GB, 6 GB RAM
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ 100</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 Reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3
                    className="product-heading
                    "
                  >
                    Type :
                  </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3
                    className="product-heading
                    "
                  >
                    Brand :
                  </h3>
                  <p className="product-data">Havells</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3
                    className="product-heading
                    "
                  >
                    Category :
                  </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3
                    className="product-heading
                    "
                  >
                    Tags :
                  </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex align-items-center gap-10 mt-2 mb-3">
                  <h3
                    className="product-heading
                    "
                  >
                    Availability :
                  </h3>
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex flex-column gap-10 mt-2 mb-3">
                  <h3 className="product-heading ">Size :</h3>
                  <div className="d-flex flex-wrap gap-10">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XLL
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-10 my-2">
                  <h3
                    className="product-heading
                    "
                  >
                    Color :
                  </h3>
                  <Color />
                </div>
                <div className="d-flex flex-row align-items-center gap-15 my-2">
                  <h3
                    className="product-heading
                    "
                  >
                    Quanity :
                  </h3>
                  <div>
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      style={{ width: "70px" }}
                      id=""
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button className="button border-0">Add to cart</button>
                    <button to="/signup" className="button signup border-0">
                      Buy it now
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      {" "}
                      <BiGitCompare className="fs-5 me-2" /> Add to compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      {" "}
                      <AiOutlineHeart className="fs-5 me-2" /> Add to wishlist
                    </a>
                  </div>
                </div>

                <div className="d-flex flex-column gap-10 my-3">
                  <h3
                    className="product-heading
                    "
                  >
                    Shipping & Returns :
                  </h3>
                  <p className="product-data">
                    Free Shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within{" "}
                    <b>5-10 buisness days!</b>
                  </p>
                </div>

                <div className="d-flex align-items-center gap-10 my-3">
                  <h3
                    className="product-heading
                    "
                  >
                    Copy Product Link :
                  </h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper home-wrapper-2 ">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
                beatae nulla dolor eum porro odio quas neque itaque, inventore
                accusantium dolorem accusamus optio facilis nemo quasi aliquam
                quo consequatur velit!
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="reviews-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3>Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 id="review" className="mb-2">
                    Customer Reviews
                  </h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProuct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>

                    <textarea
                      name=""
                      className="w-100 form-control"
                      id=""
                      color="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button  border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-3">
                <div className="review">
                  <div className="d-flex align-items-center gap-10">
                    <h6 className="mb-0">Kapil</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nostrum dolor eligendi deleniti, unde, animi odio,
                    doloremque fugiat rerum minima nobis deserunt reprehenderit
                    officia soluta molestias? Nihil molestiae debitis neque ut!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
