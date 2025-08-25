
import { Routes, Route} from 'react-router-dom'
import routes from './routes/routes'
import Navbar from './components/Navegation'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {routes.map(({path, element}, index)=>(
            <Route key={index} path={path} element={element}/>
          ))}
        </Routes>
      </main>

    </>
  )
}

export default App