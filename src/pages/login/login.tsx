/**
 * @description: 登录页 - 今天你上岸了嘛?
 * @date   2020-10-21 15:05:07
 * @author yk
 */
import React from 'react';
import './login.less';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  useHistory,
  useDispatch,
  useStore,
  Redirect,
  UserModelState,
  UserModelType,
  ConnectRC,
  connect,
} from 'umi';
import { login } from '@/services/users';
import { message } from 'antd';

export type LoginInfoType = {
  username: string;
  password: string;
};

export interface LoginProps {
  user: UserModelType;
}

const Login: ConnectRC<LoginProps> = ({ user, dispatch }) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const store = useStore();
  // if (store.getState().user.token.length != 0) {
  //   return <Redirect to="/" />;
  // }
  const onFinish = async (values: LoginInfoType) => {
    const res = await login(values);
    if (res.code !== 200) {
      message.error('请输入正确的用户名和密码!');
      return;
    }
    message.success(res.message);
    saveUserInfo(res.nickname, res.token);
    history.push('/');
  };
  const saveUserInfo = (nickname: string, token: string) => {
    dispatch({
      type: 'user/setUser',
      payload: {
        nickname,
        token,
      },
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>今天, 你, 上岸了嘛?</h2>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ user }: { user: UserModelType }) => ({ user }))(
  Login,
);
