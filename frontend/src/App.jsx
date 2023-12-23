import { BrowserRouter } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from "./components/Footer.jsx";
import Router from './routes/index.jsx';


export default function App() {
  return (
    <BrowserRouter basename='/'>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}


