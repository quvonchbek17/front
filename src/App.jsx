import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

     const [courses ,setCourses] = useState([])
     const [title ,setTitle] = useState("")
     const [price ,setPrice] = useState("")
     const [url ,setUrl] = useState("")

     function post(){
       fetch("http://80.90.188.106:9000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          price: price,
          url: url
        })
       })
       .then((res) => res.json())
       .then((data) => setCourses(data.data))
       .catch((err) => console.log(err))
     }

    useEffect(() => {
      fetch("http://80.90.188.106:9000/courses")
    .then((res) => res.json())
    .then((data) => setCourses(data.data))
    .catch((err) => console.log(err))
    }, []);

    console.log(courses);
  return (
    <>

    <form action="" onSubmit={post}>
      <input onInput={(e) => {setTitle(e.target.value)}} type="text" placeholder="Title" />
      <input type="text" onInput={(e) => {setPrice(e.target.value)}} placeholder="price" />
      <input type="text" onInput={(e) => {setUrl(e.target.value)}} placeholder="url" />
      <button>Qo'shish</button>
    </form>
        <div className="courses">
          {
            courses && courses.map(el => {
              return <div className="card">
              <h1>{el.title}</h1>
              <h2>{el.price} so'm</h2>
              <a href={el.url} target="_blank">Url</a>
              </div>
            })
          }
        </div>

    </>
  )
}

export default App
