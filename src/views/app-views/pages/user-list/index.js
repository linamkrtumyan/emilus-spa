import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "store/slices/usersSlice";
import { useNavigate } from "react-router-dom";

import { Card, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";

export const UserList = (props) => {
  const navigate = useNavigate();

  const { fetchUsers, allUsers, message, loading, showMessage } = props;

  useEffect(() => {
    fetchUsers();
  }, []);

  const tableColumns = [
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus src="" name={record.name} subTitle={record.email} />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "City",
      dataIndex: "city",
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.address.city}</span>
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.address.city.toLowerCase();
          b = b.address.city.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.company.name}</span>
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.company.name.toLowerCase();
          b = b.company.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.phone}</span>
        </div>
      ),
      sorter: {
        compare: (a, b) => a.phone.length - b.phone.length,
      },
    },

   
  ];

  if (showMessage) return <>{message}</>;
  if (loading) return <>Loading...</>;

  return (
    <>
      <Card bodyStyle={{ padding: "0px" }}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={allUsers}
            rowKey="id"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  navigate(`/app/pages/edit-user/${record.id}`, {
                    replace: true,
                  });
                },
              };
            }}
          />
        </div>
      </Card>
    </>
  );
};

const mapStateToProps = ({ users }) => {
  const { loading, message, showMessage, allUsers, redirect } = users;
  return { loading, message, showMessage, allUsers, redirect };
};

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
