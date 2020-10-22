import React from 'react';
import { ConnectRC, UserModelType, connect } from 'umi';

export interface IndexProps {
  user: UserModelType;
}

const IndexPage: ConnectRC<IndexProps> = ({ user }) => {
  return <div>待办事项</div>;
};

export default connect(({ user }: { user: UserModelType }) => ({
  user,
}))(IndexPage);
