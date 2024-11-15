import React, { useState, useEffect } from "react";
import axios from "axios";
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from "lucide-react";
import Sidebar from "./features/sidebar";
import { SidebarItem } from "./features/sidebar";
import Clientes from "./features/clientes";
import Login from "./features/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación
  const [currentPage, setCurrentPage] = useState('inicio');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obtener los usuarios almacenados en el archivo JSON al cargar la aplicación
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error al cargar los usuarios:", error);
      });
  }, []);

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true); // Autenticar usuario
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleRegister = (newUsername, newPassword) => {
    // Enviar solicitud al servidor para registrar el nuevo usuario
    axios.post('http://localhost:5000/api/register', { username: newUsername, password: newPassword })
      .then(response => {
        alert(response.data.message);
        // Actualizar la lista de usuarios después de registrarlo
        setUsers([...users, response.data.user]);
      })
      .catch(error => {
        console.error("Error al registrar el usuario:", error);
      });
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'clientes':
        return <Clientes />;
      case 'inicio':
        return (
          <>
            <h1 className="text-2xl font-semibold">Inicio</h1>
            <p>Este es el inicio de la página</p>
          </>
        );
      default:
        return (
          <>
            <h1 className="text-2xl font-semibold">Inicio</h1>
            <p>Este es el inicio de la página</p>
          </>
        );
    }
  };

  // Mostrar el login si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  // Si está autenticado, mostrar la interfaz principal
  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar>
          <button onClick={() => navigateTo('inicio')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Inicio" alert />
          </button>
          <button onClick={() => navigateTo('clientes')} className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<UserCircle size={20} />} text="Clientes" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<BarChart3 size={20} />} text="Analytics" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Package size={20} />} text="Orders" alert />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Receipt size={20} />} text="Billing" />
          </button>
          <hr className="my-3" />
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
          </button>
          <button className={`max-h-10 transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-95 duration-60 text-left`}>
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          </button>
        </Sidebar>
      </div>
      <div className="flex-1 p-8 pl-24">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
