import React, { useState } from 'react';
import {
  ConnectRC,
  UserModelType,
  connect,
  useHistory,
  useDispatch,
} from 'umi';
import { Button, Input } from 'antd';
import './index.less';

export interface IndexProps {
  user: UserModelType;
}

const IndexPage: ConnectRC<IndexProps> = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState<string>('');
  const [neddTodoList, setNeedTodoList] = useState<string[]>(['react', 'js']);
  const logout = () => {
    Promise.resolve(dispatch({ type: 'user/logout' })).then(() => {
      history.push('/login');
    });
  };
  const addItem = () => {
    console.log('调接口添加到数据库中');
  };
  return (
    <div className="todo">
      <div className="todo-title">待办事项</div>
      <Button className="btn-logout" type="primary" onClick={() => logout()}>
        退出登录
      </Button>
      <Input
        className="todo-add-input"
        value={item}
        onChange={e => setItem(e.target.value)}
      ></Input>
      <Button onClick={() => addItem}>添加</Button>
      <div className="todo-list-wrap">
        <div className="list-box todo-need">
          {neddTodoList.map((todo, index) => {
            return (
              <span className="todo-list-item" key={todo}>
                {todo}
              </span>
            );
          })}
          <p className="list-type">计划中</p>
        </div>
        <div className="list-box todo-done">
          <p className="list-type">已完成</p>
        </div>
      </div>
    </div>
  );
};

export default connect(({ user }: { user: UserModelType }) => ({
  user,
}))(IndexPage);
