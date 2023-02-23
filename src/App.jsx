import { useEffect, useState } from 'react';
import './App.css';
import api from './axios/api.js';

function App() {
  const [todos, setTodos] = useState();
  const [inputValue, setInputValue] = useState({
    title: ''
    })
  const [targetId, setTargetId] = useState('');
  const [contents, setContents] = useState ('');

  //조회
  const fetchTodos = async () => {
   const {data} = await api.get('/todos');

   setTodos(data);
  }
  // 추가
  const onSubmitHandler = async () => {
    api.post('/todos', inputValue)
    
    fetchTodos();
  }
  //삭제 
  const onDeleteHandler = async (id) => {
    api.delete(`/todos/${id}`);

    setTodos(
      todos.filter((item)=>{
        return item.id !== id;
      })
    )
  }
  // 수정
  const onUpdateHandler = async () => {
    api.patch(`/todos/${targetId}`,{
      title: contents,
    })
      setTodos(todos.map(item=>{
        if (item.id == targetId) {
          return {...item, title: contents}
        } else {
          return item;
        }
      }))
    
  }
  

  useEffect(()=>{
    // DB에서 값을 가져옴
    fetchTodos();
  }, [])
  
  return (
    <div>
      <div>
        <input type='text' placeholder='수정할 아이디를 입력하세요'
        value={targetId}
        onChange={(e)=>{
          setTargetId(e.target.value)
        }}/>
        <input type='text' placeholder='수정할 내용을 입력하세요'
        value={contents}
        onChange={(e)=>{
          setContents(e.target.value)
        }}/>
        <button onClick={onUpdateHandler}>수정하기</button> 
        <br/>
        <br/>
      </div>
      {/* form태그 안에 버튼은 type이 submit으로 되서 버튼을 누르면 새로고침 되는 것을 
      방지하기 위해 onSubmit에 e.preventDefault() */}
        <form
        onSubmit={(e)=>{
          e.preventDefault(); 

          onSubmitHandler()
        }}>
          <input type='text' 
          value={inputValue.title}
          onChange={(e)=>{
            setInputValue({
              title: e.target.value
            });
          }}/>
          <button>추가하기</button>
        </form>
      <div>
        <br/>
        {/* 데이터 영역 */}
      {todos?.map((item)=>{
        return (
        <div key={item.id}>
          {item.id} : {item.title}
          <button onClick={()=>onDeleteHandler(item.id)}>삭제</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
