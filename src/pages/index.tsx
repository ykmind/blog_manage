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

const IndexPage: ConnectRC<IndexProps> = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState<string>('');
  const [needTodoList, setNeedTodoList] = useState<string[]>([]);
  const [doneList, setDoneList] = useState<string[]>(['docker', 'nginx']);
  const dragRefs = useRef<HTMLSpanElement[]>(new Array(needTodoList.length));
  const mirrorDiv = useRef<HTMLDivElement>(null);
  const wrapDiv = useRef<HTMLDivElement>(null);
  const addDiv = useRef<HTMLDivElement>(null);
  const [dragIndex, setDragIndex] = useState<number>(0);
  useEffect(() => {
    console.log('调用接口初始化neecTodoList和doneList');
    setNeedTodoList(['react', 'index']);
    setDoneList(['docker', 'nginx']);
  }, []);
  useEffect(() => {
    const dragEl = dragRefs.current[dragIndex];
    const wrapEl = wrapDiv.current;
    if (!dragEl) return;
    if (!wrapEl) return;
    dragEl.addEventListener('dragstart', dragStart);
    dragEl.addEventListener('dragend', dragEnd);
    wrapEl.addEventListener('dragover', dragOver);
    wrapEl.addEventListener('dragleave', dragLeave);
    wrapEl.addEventListener('dragenter', dragEnter);
    wrapEl.addEventListener('drop', dragDrop);
    return () => {
      wrapEl.removeEventListener('drop', dragDrop);
      wrapEl.removeEventListener('dragover', dragOver);
      wrapEl.removeEventListener('dragleave', dragLeave);
      wrapEl.removeEventListener('dragenter', dragEnter);
      dragEl.removeEventListener('dragstart', dragStart);
      dragEl.removeEventListener('dragend', dragEnd);
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
  const mousedown = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
  ) => {
    const dragEl = dragRefs.current[index];
    const mirrorEl = mirrorDiv.current;
    setDragIndex(() => index);
    showPlaceholderDiv(dragEl);
    dragEl.style.cursor = 'move';
    mirrorEl!.className = 'mirror-div';
  };
  const mouseup = () => {
    const mirrorEl = mirrorDiv.current;
    mirrorEl!.className = 'invisible';
  };
  const showPlaceholderDiv = (el: HTMLSpanElement) => {
    const currentCss: CSSStyleDeclaration = getComputedStyle(el, null);
    const width = currentCss.width;
    mirrorDiv.current!.style.width = width;
    mirrorDiv.current!.style.display = 'inline-block';
  };
  const dragStart = () => {
    const dragEl = dragRefs.current[dragIndex];
    dragEl.className += ' dragging';
    setTimeout(() => {
      dragEl.className = 'invisible'; // 注意异步隐藏
    }, 0);
  };
  const dragEnd = () => {
    const dragEl = dragRefs.current[dragIndex];
    const mirrorEl = mirrorDiv.current;
    if (!dragEl) return;
    dragEl.className = 'todo-list-item';
    dragEl.style.cursor = 'default';
    mirrorEl!.className = 'invisible';
  };
  const dragOver = (e: any) => {
    e.preventDefault();
  };
  const dragLeave = (e: any) => {
    const dropEl = mirrorDiv.current;
    dropEl!.className = 'mirror-div';
  };
  const dragEnter = (e: any) => {
    e.preventDefault();
  };
  const dragDrop = (e: any) => {
    const dragEl = dragRefs.current[dragIndex];
    const dropEl = mirrorDiv.current;
    const addEl = addDiv.current;
    addEl!.append(dragEl);
    dropEl!.className = 'invisible';
    console.log(
      '调用接口去改变数据库中的数据, 每次刷新页面的时候重新在useEffect中初始化needTodolist和doneList即可',
    );
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
                key={index}
                ref={(el: HTMLSpanElement) => {
                  dragRefs.current[index] = el;
                }}
                draggable="true"
                onMouseDown={e => mousedown(e, index)}
                onMouseUp={() => mouseup()}
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
        <div className="list-box todo-done" ref={wrapDiv}>
          <div className="wrap-div" ref={addDiv}>
            {doneList.map((todo, index) => {
              return (
                <span className="todo-list-item" key={todo}>
                  {todo}
                </span>
              );
            })}
          </div>
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
