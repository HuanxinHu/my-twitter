import React, { useEffect } from "react";
import api from "api";
import Page from "components/Page";

interface IProps {}

const Profile: React.FC<IProps> = () => {
  const getMe = () => {
    api.getMe().then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getMe();
  });

  return (
    <Page>
      <div>profile</div>
    </Page>
  );
};

export default Profile;
