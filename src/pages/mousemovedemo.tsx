import React, { RefObject, useEffect, useRef, useState } from 'react';
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

export interface PositionProps {
  x: number;
  y: number;
  xl: number;
  yt: number;
}

const IndexPage: ConnectRC<IndexProps> = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState<string>('');
  const [needTodoList, setNeedTodoList] = useState<string[]>(['react', 'js']);
  const [doneList, setDoneList] = useState<string[]>(['docker', 'nginx']);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRefs = useRef<HTMLSpanElement[]>(new Array(needTodoList.length));
  const [dragIndex, setDragIndex] = useState<number>(0);
  const mirrorDiv = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PositionProps>({
    x: 0,
    y: 0,
    xl: 0,
    yt: 0,
  });
  useEffect(() => {
    document.onmousemove = function(e: any) {
      if (isDragging) {
        const el = dragRefs.current[dragIndex];
        const { x, y, xl, yt } = position;
        let newX = e.clientX;
        let newY = e.clientY;
        let distanceX = newX - (x - xl);
        let distanceY = newY - (y - yt);
        el.style.position = 'absolute';
        el.style.left = distanceX + 'px';
        el.style.top = distanceY + 'px';
      }
    };
  });

  const logout = () => {
    Promise.resolve(dispatch({ type: 'user/logout' })).then(() => {
      history.push('/login');
    });
  };
  const addItem = () => {
    // 姑且使用useState模拟接口
    setNeedTodoList([...needTodoList, item]);
    setItem('');
  };
  const enterInput = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };
  const moveStart = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
  ) => {
    const el = dragRefs.current[index];
    setDragIndex(index);
    let initPosition: PositionProps = {
      x: e.clientX,
      y: e.clientY,
      xl: el.offsetLeft,
      yt: el.offsetTop,
    };
    setPosition(initPosition);
    setIsDragging(true);
    showPlaceholderDiv(el);
    el.style.cursor = 'move';
  };
  const showPlaceholderDiv = (el: HTMLSpanElement) => {
    const currentCss: CSSStyleDeclaration = getComputedStyle(el, null);
    const width = currentCss.width;
    mirrorDiv.current!.style.width = width;
    mirrorDiv.current!.style.display = 'inline-block';
  };
  const moveEnd = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
  ) => {
    const el = dragRefs.current[index];
    el.style.cursor = 'default';
    el.style.position = 'static';
    console.log('isDragging', isDragging);
    if (isDragging) {
      console.log('接收数据到doneList, 并从todoList中删除该dom');
    }
    setIsDragging(false);
    mirrorDiv.current!.style.display = 'none';
  };
  return (
    <div className="todo">
      <div className="todo-title">你搞定了吗?</div>
      <Button className="btn-logout" type="primary" onClick={() => logout()}>
        退出登录
      </Button>
      <Input
        className="todo-add-input"
        value={item}
        onChange={e => setItem(e.target.value)}
        onKeyUp={e => enterInput(e)}
      ></Input>
      <Button onClick={() => addItem()}>添加</Button>
      <div className="todo-list-wrap">
        <div className="list-box todo-need">
          {needTodoList.map((todo, index) => {
            return (
              <span
                className="todo-list-item"
                key={todo}
                ref={(el: HTMLSpanElement) => {
                  dragRefs.current[index] = el;
                }}
                onMouseDown={e => moveStart(e, index)}
                onMouseUp={e => moveEnd(e, index)}
              >
                {todo}
              </span>
            );
          })}
        </div>
        <p className="list-type">计划中</p>
        <div className="todo-direction">
          <div className="todo-arrow" />
        </div>
        {/* 小坑点: 拖拽一个div到下面div的时候, 并不会触发事件,被拖拽的div挡住了... */}
        <div className="list-box todo-done">
          {doneList.map((todo, index) => {
            return (
              <span className="todo-list-item" key={todo}>
                {todo}
              </span>
            );
          })}
          <div className="mirror-div" ref={mirrorDiv} />
        </div>
        <p className="list-type">已完成</p>
      </div>
    </div>
  );
};

export default connect(({ user }: { user: UserModelType }) => ({
  user,
}))(IndexPage);
