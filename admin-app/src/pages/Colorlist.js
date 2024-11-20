import React, { useEffect } from "react";
import { Table } from "antd";
import { getColors } from "../features/color/colorSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(getColors());
  }, []);

  const data1 = [];
  const getColorState = useSelector((state) => state.color.colors);
  for (let i = 0; i < getColorState.length; i++) {
    data1.push({
      key: i + 1,
      name: getColorState[i].title,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            {" "}
            <BiEdit />{" "}
          </Link>
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
          <h3 className="mb-4 title">Color List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Colorlist;
