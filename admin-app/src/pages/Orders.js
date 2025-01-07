import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllOrders } from "../features/auth/authSlice";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(getAllOrders());
  }, []);

  const getAllOrdersState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < getAllOrdersState.length; i++) {
    data1.push({
      key: i + 1,
      name: getAllOrdersState[i].orderby.firstname,
      product: getAllOrdersState[i].products.map((i, j) => {
        return (
          <ul key={j}>
            <li>{i.product.title}</li>
          </ul>
        );
      }),
      amount: getAllOrdersState[i].paymentIntent.amount,
      date: new Date(getAllOrdersState[i].createdAt).toLocaleString(),
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
          <h3 className="mb-4 title">Orders</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
