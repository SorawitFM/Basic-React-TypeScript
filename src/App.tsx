import React, { useState } from 'react'

import './App.css'

type Props = {}
interface item {
  id: number,
  name: string,
  lastName: string,
  status: number
}


export default function App({ }: Props) {
  const [todos, setTodos] = useState<item[]>([]);

  var [todosFind, setTodosFind] = useState<item[]>([]);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [editName, editSetName] = useState<string>("");
  const [editLastName, editSetLastName] = useState<string>("");

  const [value, setValue] = useState<string>("");

  const addPerson = () => {
    const newTodo: item = {
      id: + new Date(),  //เครื่องหมาย + เป็น Operator ที่ทำให้ new Date() กลายเป็นจำนวนเต็ม
      name: name,
      lastName: lastName,
      status: 1,
    }
    setTodos([...todos, newTodo]) //แนวคิดเดียวกันกับสมการ todos = todos + newTodo คือเก็บข้อมูลเดิมแล้วเพิ่มข้อมูลใหม่เข้าไป 
    //หากจะดูว่าทำไมต้องใช้ [...todos, newTodo] ให้ไปดู ExampleComponent from './component/SpreadOperator/index.jsx'
    setName("")
    setLastName("")
  }

  const editPerson = (index: number) => {
    todos[index].status = 2;
    editSetName(todos[index].name);
    editSetLastName(todos[index].lastName);
    setTodos([...todos]);
  }
  /*เมื่อกดปุ่ม editPerson status เปลี่ยน จาก 1 เป็น 8 ทำให้ if-else การ return เปลี่ยนเป็นช่องสำหรับแก้ไข โดยในช่องก็จะดึงค่ามาจาก todos
  เรากดที่ตัวไหน index ก็จะเป็นของตัวนั้น   และ setTodos([...todos]) เพื่อให้ React ทราบว่าข้อมูลใน todos ได้เปลี่ยนแปลงแล้ว  */

  const savePerson = (index: number) => {
    todos[index].name = editName;
    todos[index].lastName = editLastName;
    todos[index].status = 1;
    setTodos([...todos]);
  }
  /*หลังจากที่่เราแก้ไขค่าค้างใว้ใน input แล้วทำการกดปุ่ม savePerson todos ก็จะถูกแทนที่ด้วยค่า editPerson ที่เราพิมพ์ค้างไว้ แล้วทำการ setTodos
  เพื่อ Update Todos  */

  const removePerson = (index: number) => {
    todos.splice(index, 1); // splice(index,x) ลบสมาชิกออก x ตัว เริ่มลบตั้งแต่ตัวที่ index
    setTodos([...todos]);
  }

  const backEdit = (index: number) => {
    todos[index].status = 1; //เพื่อให้ return เงื่อนไขที่เหมือนการเพิ่ม/แก้ไขข้อมูลแล้ว
    setTodos([...todos]);
  }

  const findData = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*ในReact ธรรมดาเราจะชินกับ (event) เฉยๆ แต่ใน TypeScript จะเป็นการบอกให้ตัว React ให้รู้ว่า event ที่เราใช้นั้นมันคือตัวแทนของ 
    React.ChangeEvent ใน element input หรือก็คือตรวจการเปลี่ยนแปลงใน input นั่นเอง(event มีหลายแบบ จึงต้องระบุว่า event นี้คือ change)*/
    setValue(event.target.value);
    /* โดยทั่วไปเราจะใช้ event.target.value เพื่อนำเอาค่า value จาก element นั้นมาใช้ เนื่องจาก event นั้นเกิดขึ้นมากมาย การ.target เข้าไป
    คือการที่เราสนใจ event ที่เรากำลังทำงานอยู่ ซึ่งจำนวน event ก็จะลดลงมา และเมื่อ.value ไปอีกจะทำให้ได้ค่า value ที่กำลัง target event มา  */
    var textFind = event.target.value;
    if (textFind.length > 2) {
      const array = todos.filter((todos) => todos.name.includes(textFind) || todos.lastName.includes(textFind));
      console.log(array)
      todosFind = array;
      setTodosFind([...todosFind])
    }
  }

  return (
    <div>App to do list

      <ul>
        {
          todos.map((todos: item, index: number) => {
            if (todos.status == 1) {
              return (
                <li key={todos.id}>
                  ชื่อ: {todos.name} สกุล {todos.lastName}
                  <button onClick={() => editPerson(index)}>แก้ไข</button>
                  <button onClick={() => removePerson(index)}>ลบข้อมูล</button>
                </li>

              )
            } else {
              return (
                <li key={todos.id}>
                  ชื่อ:
                  <input type='text' value={editName} onChange={(e) => editSetName(e.target.value)}></input>
                  สกุล:
                  <input type='text' value={editLastName} onChange={(e) => editSetLastName(e.target.value)}></input>
                  <button onClick={() => savePerson(index)}>บันทึกข้อมูล</button>
                  <button onClick={() => backEdit(index)}>ย้อนกลับ</button>
                </li>
              )
            }
          })
        }
      </ul>

      <form>
        <label>ชื่อ:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>สกุล:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </form>
      <button onClick={() => addPerson()}>add person</button>

      <h3>ค้นหาข้อมูล</h3>
      <input type="text" value={value} onChange={findData} />
      <ul>
        {
          todosFind.map((todosFind: item) => {

            return (
              <li key={todosFind.id}>
                ชื่อ: {todosFind.name} สกุล: {todosFind.lastName}
              </li>
            )
            /*เมื่อเราทำการกรอก Value ที้ต้องการค้นหาลงใน input function findData จะทำงาน หาก todos.filter มีค่าที่ตรงกัน จะทำการสร้าง Array
            ของ todosFind ขึ้นมา และเมื่อเราจะแสดงผล ก็จะใช้ Method map() ที่จะเข้าไปทำการวน loop สมาชิกภายใน todoFind แล้วมา return ในรูป
            แบบ list ที่ต้องการ*/
          })
        }
      </ul>



    </div>
  )
}
