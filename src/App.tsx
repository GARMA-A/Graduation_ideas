function App() {
  return (<>
    <div className="bg-black text-white p-4 flex justify-between items-center">

      <h1 className="bg-blue-800 text-white">Welcome to My App</h1>
      <p className="text-white">This is a simple React application.</p>
      <button className="bg-blue-500 text-black" onClick={() => alert('Button clicked!')}>Click Me!</button>

    </div>
  </>)

}

export default App
