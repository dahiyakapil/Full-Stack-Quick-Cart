import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Table } from "antd";


import { Column } from "@ant-design/plots";
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 28,
    },
    {
      type: "Jan",
      sales: 28,
    },
    {
      type: "feb",
      sales: 28,
    },
    {
      type: "Mar",
      sales: 28,
    },
    {
      type: "Apr",
      sales: 28,
    },
    {
      type: "May",
      sales: 28,
    },
    {
      type: "Jun",
      sales: 28,
    },
    {
      type: "July",
      sales: 28,
    },
    {
      type: "Aug",
      sales: 28,
    },
    {
      type: "Sept",
      sales: 28,
    },
    {
      type: "Oct",
      sales: 28,
    },
    {
      type: "Nov",
      sales: 28,
    },
    {
      type: "Dec",
      sales: 28,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },

    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

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
      title: "Product Count",
      dataIndex: "count",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const data1 = Array.from({
    length: 46,
  }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }));

  return (
    <>
      <div>
        <h3 className="mb-4 title">Dashboard</h3>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
            <div>
              <p className="desc">Total</p>
              <h4 className="mb-0 sub-title ">$1000</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>
               
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Compared to April 2024</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
            <div>
              <p className="desc">Total</p>
              <h4 className="mb-0 sub-title">$1000</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="red">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Compared to April 2024</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
            <div>
              <p className="desc">Total</p>
              <h4 className="mb-0 sub-title">$1000</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="green">
          
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Compared to April 2024</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
