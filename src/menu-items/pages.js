import { LoginOutlined, ProfileOutlined } from "@ant-design/icons";

const icons = {
  LoginOutlined,
  ProfileOutlined,
};

const pages = {
  id: "crud",
  title: "Crud",
  type: "group",
  children: [
    {
      id: "persons",
      title: "Pessoas",
      type: "item",
      url: "/persons",
      icon: icons.LoginOutlined,
      target: false,
    },
  ],
};

export default pages;
