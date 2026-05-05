/**
 * @fileoverview Componente para el inicio de sesión de usuarios.
 * Maneja el formulario de credenciales y la petición de autenticación a la API.
 */
import React, { useState } from 'react';
import api from '../api/api';
import { ShieldCheck, LogIn } from 'lucide-react';

/**
 * Componente funcional de Login.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onLogin - Callback ejecutado al iniciar sesión correctamente con los datos del usuario.
 * @param {Function} props.onSwitch - Callback para cambiar a la vista de registro.
 * @returns {JSX.Element}
 */
const Login = ({ onLogin, onSwitch }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Manejador del envío del formulario de login.
   * Realiza la petición POST y si es exitosa guarda el token.
   * 
   * @async
   * @param {React.FormEvent} e - Evento de submit del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { usuario, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        onLogin(response.data.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md w-full bg-[#0a0a0a] p-12 rounded-[3.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-premium-pink rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,174,201,0.2)]">
          <ShieldCheck className="text-black" size={48} />
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2 leading-none">Acceso <br/><span className="text-premium-pink">Oficial</span></h1>
        <p className="text-gray-700 font-black uppercase tracking-[0.3em] text-[10px] mt-4">Sistema de Liga Profesional</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">Nombre de Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-premium-pink focus:bg-white/[0.05] transition-all font-bold text-sm text-white placeholder:text-gray-800"
            placeholder="admin"
            required
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-premium-pink focus:bg-white/[0.05] transition-all font-bold text-sm text-white placeholder:text-gray-800"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase py-4 rounded-2xl text-center tracking-widest">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-white text-black font-black py-6 rounded-[1.5rem] hover:bg-premium-pink transition-all transform active:scale-95 shadow-2xl hover:shadow-premium-pink/30 uppercase italic tracking-tighter text-xl flex items-center justify-center gap-4"
        >
          <LogIn size={24} />
          Entrar al Sistema
        </button>
      </form>

      <div className="mt-12 pt-12 border-t border-white/5 text-center flex flex-col gap-6">
        <button 
          onClick={() => onSwitch('register')}
          className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]"
        >
          ¿No tienes cuenta? <span className="text-premium-pink underline decoration-2 underline-offset-4">Regístrate ahora</span>
        </button>
        
        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
            Credenciales de prueba:<br/>
            <span className="text-gray-400">Usuario: admin</span><br/>
            <span className="text-gray-400">Clave: 123456</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
