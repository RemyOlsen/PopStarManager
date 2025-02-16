import { PopStarProvider } from './contexts/PopStarContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PopStarPage, AdminPage } from './pages/PageIndex';
import Navbar from './components/shared/Navbar';
import Hero from './components/shared/Hero';

import './App.css'
import Footer from './components/shared/Footer';

function App() {

  return (
    <PopStarProvider>
        <BrowserRouter>
          <div className="bg-black min-h-screen">
              <Hero />
              <Navbar />

                <Routes>
                  <Route path = "/" element = {<PopStarPage />}></Route>
                  <Route path = "/admin" element = {<AdminPage />}></Route>
                  <Route path = "*" element = {<h1>Not Found</h1>}></Route>
              </Routes>
              <Footer />
            </div>
        </BrowserRouter>
      </PopStarProvider>
  )
}

export default App
