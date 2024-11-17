import React from "react";
import { Table } from "antd";
const Blogcatlist = () => {
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
        <div className="mt-4 title">
          <h3 className="mb-4">Blogs Categories</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogcatlist;
