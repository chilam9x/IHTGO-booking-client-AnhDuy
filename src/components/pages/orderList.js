import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Row, Col, Skeleton } from "antd";
import { setTimeout } from "timers";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.name.length - b.name.length,
    render: text => text
  },
  {
    title: "Tên đơn hàng",
    dataIndex: "id",
    key: "id",
    render: text => text
  },
  {
    title: "Trạng thái",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          return (
            <Tag color="green" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Tổng tiền",
    dataIndex: "id",
    key: "id",
    render: text => text
  },
  {
    title: "Khách hàng",
    dataIndex: "id",
    key: "id",
    render: text => text
  },
  {
    title: "Gửi từ",
    dataIndex: "id",
    key: "id",
    render: text => text
  },
  {
    title: "Gửi đến",
    dataIndex: "id",
    key: "id",
    render: text => text
  },
  {
    title: "Ngày tạo đơn",
    dataIndex: "id",
    key: "id",
    render: text => text
  }
];

const OrderList = props => {
  const [state, setState] = useState({
    loading: true,
    loadingMore: false,
    data: [
      {
        id: "1",
        key: "1",
        name: "John Brown",
        tags: ["nice", "developer"]
      }
    ]
  });

  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        loading: false
      });
    }, 3000);
  }, [state]);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Input placeholder="tìm kiếm đơn hàng" allowClear />
          </Col>
          <Col className="gutter-row" span={6}>
            <Button type="primary">Tất cả</Button>
            <Button>Đang chờ</Button>
            <Button type="danger">Chưa giao</Button>
            <Button>Đã giao</Button>
          </Col>
          <Col className="gutter-row" span={6}>
            <Button type="danger">Tiền mặt</Button>
            <Button>Ghi nợ</Button>
          </Col>
        </Row>
        <Input.Group />
      </div>

      <Skeleton
        active
        paragraph={{ rows: 10, width: "100%" }}
        loading={state.loading}
        title={false}
      >
        <Table
          columns={columns}
          dataSource={state.data}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                props.history.push("/order/" + record.id);
              }
            };
          }}
        />

        <Skeleton
          active
          paragraph={{ rows: 10, width: "100%" }}
          loading={state.loadingMore}
          title={false}
        >
          <Button
            type="danger"
            block
            style={{
              margin: "20px 0"
            }}
            onClick={() => {
              setState({ ...state, loadingMore: true });
              //call api
              setTimeout(() => {
                setState({
                  ...state,
                  data: [
                    ...state.data,
                    {
                      id: "1",
                      key: "1",
                      name: "John Brown",
                      tags: ["nice", "developer"]
                    }
                  ]
                });
              }, 3000);
            }}
          >
            Xem thêm...
          </Button>
        </Skeleton>
      </Skeleton>
    </>
  );
};

export default OrderList;
