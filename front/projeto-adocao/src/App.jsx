
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NavBar from "./Rotas/nav bar/navBar.jsx";
import Home from './Rotas/home/home.jsx';
import Login from './Rotas/login/login.jsx';
import Cadastro from './Rotas/cadastro/cadastro.jsx';
import Perfil from "./Rotas/Perfil/perfil.jsx";
import EditarPerfil from "./Rotas/editar perfil/editarPerfil.jsx";
import CadastroPet from "./Rotas/cadastro pet/cadastroPet.jsx";
import MeusPets from "./Rotas/meus pets/meusPets.jsx";
import Pet from "./Rotas/pet/pet.jsx";
import EditarPet from "./Rotas/editar pet/editPet.jsx";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />
      },
      {
        path: "/perfil",
        element: <Perfil />
      },
      {
        path: "/editar-perfil",
        element: <EditarPerfil />
      },
      {
        path: "/cadastro-pet",
        element: <CadastroPet />
      },
      {
        path: "/meus-pets",
        element: <MeusPets />
      },
      {
        path: "/pet",
        element: <Pet/>
      },
      {
        path: "/editar-pet",
        element: <EditarPet />
      }
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router}/>
  );
}
