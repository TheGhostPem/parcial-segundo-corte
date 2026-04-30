import React, { useState } from 'react';
import api from '../api/api';
import { UserPlus, ArrowLeft } from 'lucide-react';

const Register = ({ onBack }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('usuario');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { usuario, password, rol });
      if (response.data.success) {
        setMsg(response.data.message);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrar');
      setMsg('');
    }
  };

  return (
    <div className="max-w-md w-full bg-[#0a0a0a] p-12 rounded-[3.5rem] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/10">
          <UserPlus className="text-premium-pink" size={32} />
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Crear Cuenta</h1>
        <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">Unirse al Sistema de Liga</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-2">Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-pink font-bold text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-pink font-bold text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-2">Rol Asignado</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-pink font-bold text-sm appearance-none"
          >
            <option value="usuario" className="bg-black">Usuario Estándar</option>
            <option value="moderador" className="bg-black">Moderador</option>
            <option value="admin" className="bg-black">Administrador</option>
          </select>
        </div>

        {msg && <p className="text-green-500 text-[10px] font-black uppercase text-center bg-green-500/10 py-3 rounded-xl border border-green-500/20">{msg}</p>}
        {error && <p className="text-red-500 text-[10px] font-black uppercase text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">{error}</p>}

        <button
          type="submit"
          className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-premium-pink transition-all uppercase italic tracking-tighter text-lg"
        >
          Registrar Usuario
        </button>
      </form>

      <button 
        onClick={onBack}
        className="mt-8 w-full flex items-center justify-center gap-2 text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-widest"
      >
        <ArrowLeft size={14} />
        Volver al Inicio de Sesión
      </button>
    </div>
  );
};

export default Register;
