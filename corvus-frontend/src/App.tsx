import { MdOutlineArrowForward } from "react-icons/md";
// import './App.css'
// import {AdminForm}
import {ButtonApp, BrandLogo, FooterCatalog, AdminForm, AdministrativeShell} from './components/common';
import { Product, CalendarModal } from "./components/features";
import {HeaderBar, CalendarSection, HeroSection} from "./components/common/page_sections"
import { ModalProvider } from "./context/ModalContext";
import { Catalog } from "./components/pages/Catalog";
// import 
function App() {


  return (
    <>
    {/* <AdministrativeShell/> */}
    <Catalog/>

    {/* <HeaderBar/>
    <HeroSection/>

    <ModalProvider>
      <CalendarSection/>
    </ModalProvider> */}
    
    {/* <ButtonApp buttonText='Explorar catálogo' icon={<MdOutlineArrowForward/>}/> */}
    {/* <Product
      productName="Figura de coleccion "
      price="$120.00"
      category="Figuras de anime"

    />

   

    <FooterCatalog/>
    <AdminForm/>

    <br/><br/>
    <CalendarModal /> */}
    </>
  )
}

export default App



// function App() {

//   return (
//     <>
//       <div></div>
//     </>
//   )
// }

// export default App;
