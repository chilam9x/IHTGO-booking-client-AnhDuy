import React from "react";
import { Menu, Icon, Layout } from "antd";

const { SubMenu } = Menu;

const Header = () => {
  return (
    <Layout style={{ backgroundColor: "white", padding: 0 }}>
      <Menu
        selectedKeys={[1]}
        mode="horizontal"
        style={{ alignSelf: "flex-end" }}
      >
        <Menu.Item key="mail">
          <Icon type="global" />
          Việt Nam
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Admin
            </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">
              <Icon type="user" />
              Thông tin cá nhân
            </Menu.Item>
            <Menu.Item
              key="setting:2"
              onClick={() => {
                localStorage.removeItem("user_info");
                window.location.href = "/signin";
              }}
            >
              <Icon type="logout" />
              Đăng xuất
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </Layout>
  );
};

export default Header;
