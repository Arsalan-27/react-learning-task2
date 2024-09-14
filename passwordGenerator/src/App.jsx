import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
     if (CharAllowed) {
      str += "~!@#$^%^&*"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, CharAllowed, setPassword])
    

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)
  } , [password])
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed , CharAllowed , passwordGenerator])

  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3   bg-black ">
      <h1 className=' text-fuchsia-700 text-center my-3 mt-3 text-bold '><strong>Password Generator</strong></h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 bg-cyan-50 text-black "
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button id='copyButton' className='bg-blue-500 shrink-0  outline-none text-white px-2 py-2 ml-3 ' onClick={copyPasswordToClipboard}>copy</button>
      </div>

      <div className="flex text-sm gap-x-2"></div>
      <div className="flex items-center gap-x-1">
        <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }}
        />
        <label>length: {length}</label>
      </div>

      <div className="flex items-center gap-x-1 mt-3 ">
        <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => { setNumberAllowed((prev) => !prev) }} />
        <label htmlFor='numberInput' >Numbers</label>
      </div>

      <div className="flex items-center gap-x-1 mt-3 ">
        <input type="checkbox" defaultChecked={CharAllowed} id='numberInput' onChange={() => { setNumberAllowed((prev) => !prev) }} />
        <label htmlFor='characteInput' >Characters</label>
      </div>


    </div>

  )
}

export default App
