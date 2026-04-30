import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import LeagueDashboard from './pages/LeagueDashboard';
import PlayersDashboard from './pages/PlayersDashboard';
import CompetitionDashboard from './pages/CompetitionDashboard';
import './index.css';

function App() {
  // Estados globales: usuario logueado, vista actual y estado de carga
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('equipos'); // Tab activa del dashboard
  const [checking, setChecking] = useState(true);

  // Efecto para recuperar la sesión al cargar la página (RF-02)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setChecking(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setView('login');
  };

  if (checking) return null;

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col font-sans selection:bg-premium-pink selection:text-black">
      {!user ? (
        <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
          {/* Fondos decorativos */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-premium-pink/5 rounded-full blur-[150px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] -z-10"></div>
          
          {view === 'login' ? (
            <Login onLogin={handleLogin} onSwitch={setView} />
          ) : (
            <Register onBack={() => setView('login')} />
          )}
        </div>
      ) : (
        <>
          {/* Barra de Navegación Premium (RF-02) */}
          <nav className="w-full h-28 border-b border-white/5 px-8 md:px-16 flex items-center justify-between sticky top-0 bg-[#050505]/90 backdrop-blur-2xl z-50">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center font-black text-3xl italic shadow-[0_10px_30px_rgba(255,255,255,0.1)]">L</div>
              <div className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">GESTOR <span className="text-premium-pink">FEF</span></span>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mt-1 ml-1">Liga Profesional</span>
              </div>
            </div>
            
            <div className="flex items-center gap-12">
              <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                <span 
                  onClick={() => setActiveTab('equipos')}
                  className={`${activeTab === 'equipos' ? 'text-white border-b-2 border-premium-pink cursor-default' : 'hover:text-premium-pink cursor-pointer'} pb-2 transition-colors`}
                >
                  Equipos
                </span>
                <span 
                  onClick={() => setActiveTab('jugadores')}
                  className={`${activeTab === 'jugadores' ? 'text-white border-b-2 border-premium-pink cursor-default' : 'hover:text-premium-pink cursor-pointer'} pb-2 transition-colors`}
                >
                  Jugadores
                </span>
                <span 
                  onClick={() => setActiveTab('competicion')}
                  className={`${activeTab === 'competicion' ? 'text-white border-b-2 border-premium-pink cursor-default' : 'hover:text-premium-pink cursor-pointer'} pb-2 transition-colors`}
                >
                  Competición
                </span>
              </div>
              
              {/* RF-02: Perfil con Avatar y Rol */}
              <div className="flex items-center gap-6 bg-white/[0.03] pl-3 pr-3 py-3 rounded-[1.5rem] border border-white/5 shadow-inner">
                {/* Avatar visual (Inicial del usuario) */}
                <div className="w-10 h-10 bg-premium-pink rounded-xl flex items-center justify-center text-black font-black text-lg shadow-[0_0_15px_rgba(255,174,201,0.3)]">
                  {user.usuario?.charAt(0).toUpperCase() || 'U'}
                </div>
                
                <div className="flex flex-col items-start pr-4">
                  <span className="text-sm font-black text-white italic leading-tight">{user.usuario || 'Usuario'}</span>
                  <span className="text-[9px] font-black text-premium-pink uppercase tracking-widest">{user.rol}</span>
                </div>

                {/* Botón de Cierre de Sesión */}
                <button 
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl transition-all duration-300 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </button>
              </div>
            </div>
          </nav>
          
          <main className="flex-1 flex justify-center py-10">
            {activeTab === 'equipos' && <LeagueDashboard />}
            {activeTab === 'jugadores' && <PlayersDashboard />}
            {activeTab === 'competicion' && <CompetitionDashboard />}
          </main>
        </>
      )}

      <footer className="py-16 border-t border-white/5 text-center bg-[#030303]">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-center items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-800">
          © 2026 LIGA PROFESIONAL DE FÚTBOL
        </div>
      </footer>
    </div>
  );
}

export default App;
