import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "../pages/PageHome";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageWorks from "../pages/PageWorks";
import PageWork from "../pages/PageWork";
import PageAbout from "../pages/PageAbout";
function AppRouter(){

  const restBase = 'https://johnyungzhou.com/pdata/wp-json/wp/v2/';

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <PageHome restBase={restBase}/>}/>
        <Route path='/works' element={ <PageWork restBase={restBase} />} />
        <Route path='/works/:slug' element={ <PageWorks restBase={restBase} />} />
        <Route path='/about' element={ <PageAbout restBase={restBase} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter;