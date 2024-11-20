import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getEnquiries } from "../features/enquiry/enquirySlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(getEnquiries());
  }, []);

  const data1 = [];
  const getenquiryState = useSelector((state) => state.enquiry.enquiries);
  for (let i = 0; i < getenquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: getenquiryState[i].name,
      email: getenquiryState[i].email,
      mobile: getenquiryState[i].mobile,
      status: (
        <>
          <select name="" className="form-control form-select" id="">
            {" "}
            <option value="">Set Status</option>{" "}
          </select>
        </>
      ),
      action: (
        <>
          <Link to="/" className="ms-3 fs-3 text-danger">
            {" "}
            <AiFillDelete />{" "}
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <div className="mt-4">
          <h3 className="mb-4 title">Enquiries</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiries;
