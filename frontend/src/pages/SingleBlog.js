import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import blog1 from "../images/blog-1.jpg";
import Container from "../components/Container";

const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title={"Dynamic Blog Name"} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" />
                Go back to Blogs
              </Link>
              <h3 className="title">A Beautiful Sunday Morning Renaissance</h3>
              <img src={blog1} alt="blog" className="img-fluid w-100 my-4" />
              <p>
                What You Need to Know about the Facebook Product Design
                Interview and What to do about it Vinyl lumbersexual hella hot
                chicken aesthetic, intelligentsia raclette gentrify activated
                charcoal VHS. Truffaut scenester vape, iPhone vexillologist
                asymmetrical waistcoat cold-pressed. Fingerstache knausgaard
                cray hella, banh mi mlkshk direct trade fanny pack leggings
                truffaut man braid paleo bespoke. Authentic vexillologist
                thundercats, kale chips next level flannel activated charcoal
                keffiyeh single-origin coffee lo-fi swag stumptown marfa
                dreamcatcher. Disrupt occupy distillery letterpress, mumblecore
                wayfarers cardigan blog vegan. Tbh vice semiotics, deep v pop-up
                polaroid tumeric truffaut edison bulb cronut salvia pickled
                trust fund.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
