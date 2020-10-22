import React from 'react';
import { ConnectRC, UserModelType, connect, useHistory } from 'umi';
import { Button } from 'antd';

export interface IndexProps {
  user: UserModelType;
}

const IndexPage: ConnectRC<IndexProps> = ({ user }) => {
  const history = useHistory();
  const logout = () => {
    console.log('调用退出接口,清空用户,dva和缓存,然后跳转到登录页');
    history.push('/login');
  };
  return (
    <div>
      待办事项
      <Button type="primary" onClick={() => logout()}>
        退出登录
      </Button>
    </div>
  );
};

export default connect(({ user }: { user: UserModelType }) => ({
  user,
}))(IndexPage);
