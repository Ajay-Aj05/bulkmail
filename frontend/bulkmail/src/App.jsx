import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import * as XLSX from "xlsx"
import { use } from 'react'

function App() {
  const [msg,setmsg] = useState("")
  const [status,setstatus] = useState(false)
  const [emaillist , setemaillist] = useState([])
  function handlechange(e){
    setmsg(e.target.value)
    console.log(e.target.value)

  }
function send(){
  setstatus(true)
  axios.post("http://localhost:4000/sendemail",{msg:msg,emaillist:emaillist})
  .then(function(data){
    if(data.data === true){
      alert("email message send")
      setstatus(false)
    }
    else{
      alert("error")
    }
  })
  

}

function handlefile(event){
   
     const file = event.target.files[0]
    console.log(file)
   const reader = new FileReader()
   reader.onload= function(event){
    console.log(event)
    const data = event.target.result
    console.log(data)
    const workbook = XLSX.read(data,{type:'binary'})
    console.log(workbook)
    const sheetname = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetname]
    const emailsheet = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
    console.log(emailsheet)
    const totalemail = emailsheet.map(function(item){return item.A})
    setemaillist(totalemail)


   }
   reader.readAsBinaryString(file)
}

  return (
   <div>
     <div className="bg-blue-900 text-white text-center">
      <h1 className='text-2xl font-medium px-5 py-3'>BulkMail</h1>

    </div>
     <div className="bg-blue-700 text-white text-center">
      <h1 className=' font-medium px-5 py-3'>We can help you by sending multiple emails at once</h1>

    </div>
     <div className="bg-blue-400 text-white text-center">
      <h1 className='text-2xl font-medium px-5 py-3'>Drag and Drop</h1>

    </div>
    <div className='bg-blue-300 flex flex-col items-center text-black py-5 px-3'>
      <textarea onChange={handlechange} value={msg} className='outline-none px-2 border border-black rounded-lg w-80 h-40' id="" placeholder='enter your email message...'></textarea>
      <div>
      <input id='fileinput' onChange={handlefile} type="file" className='border-4 border-dotted py-4 my-5 px-4' />
    </div>
    </div>
    <p className='mt-2'>Total number of Email : {emaillist.length}</p>
    <button onClick={send} className='bg-blue-400 px-5 py-3 rounded font-medium text-black mt-6'>{status?"sending":"send"}</button>
    
   </div>
  )
}

export default App
