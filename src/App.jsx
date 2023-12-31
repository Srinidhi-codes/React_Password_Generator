import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+= "0123456789";
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`";

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 999);  for selection of password from 0 to 99 character range.
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator,numberAllowed,charAllowed,length]);

  return (
    <>
      {/* <h1 className='text-black text-center text-[5rem] font-bold'>Password Generator</h1> */}
      <div className='w-[20rem] lg:w-[40rem] h-[25rem] lg:h-[20rem] flex flex-col justify-center items-center mx-auto rounded-lg px-4 py-3 my-8 text-black backdrop-blur-sm bg-white/30 main'>
      <h1 className='text-black text-center text-[2rem] font-bold top-[-10rem] py-5'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mt-2 mb-10 '>
          <input 
          className='outline-none w-full py-1 px-3 text-xl font-medium text-black bg-[#CEE5F2]'
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          />
        <button 
        className='outline-none bg-green-300 hover:bg-green-600 text-black font-bold px-3 py-0.5'
        onClick={copyPasswordToClipboard}
        >Copy</button>
        </div>
        <div className='flex flex-col lg:flex-row gap-x-5 mt-4'> 
          <div className='flex items-center gap-x-2 text-xl'>
            <input 
            className='cursor-pointer'
            type="range" 
            min={8} 
            max={20}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 text-xl">
            <input 
            type="checkbox"
            onChange={() => {
                setNumberAllowed((prev) => !prev);
            }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 text-xl">
            <input 
            type="checkbox"
            onChange={() => {
              setCharAllowed((prev) => !prev )
          }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
