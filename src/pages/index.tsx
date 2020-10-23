import React from 'react';
import {
  ConnectRC,
  UserModelType,
  connect,
  useHistory,
  useDispatch,
} from 'umi';
import { Button } from 'antd';

export interface IndexProps {
  user: UserModelType;
}

const IndexPage: ConnectRC<IndexProps> = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    Promise.resolve(dispatch({ type: 'user/logout' })).then(() => {
      history.push('/login');
    });
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
