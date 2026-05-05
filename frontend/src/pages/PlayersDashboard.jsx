/**
 * @fileoverview Dashboard de Jugadores.
 * Permite visualizar y buscar a todos los jugadores de la liga.
 */
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Users, Shield, Search, Database } from 'lucide-react';

/**
 * Componente funcional para el listado global de jugadores.
 * Implementa un buscador cliente-side para filtrar jugadores por nombre, posición o equipo.
 * 
 * @component
 * @returns {JSX.Element}
 */
const PlayersDashboard = () => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Carga todos los jugadores registrados desde la API.
   * Mapea los resultados para asegurar que todos tengan el nombre de equipo o 'Sin equipo'.
   * 
   * @async
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/jugadores');
      if (res.data.success) {
        // Mapear los jugadores obtenidos, manejando si el equipo es nulo
        const allJugadores = res.data.data.map(j => ({
          ...j,
          equipoNombre: j.equipo ? j.equipo.nombre : 'Sin equipo'
        }));
        setJugadores(allJugadores);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const filtrados = jugadores.filter(j => 
    j.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    j.posicion?.toLowerCase().includes(busqueda.toLowerCase()) ||
    j.equipoNombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-premium-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl w-full p-6 md:p-10">
      
      {/* BARRA DE HERRAMIENTAS: BÚSQUEDA */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar jugador o equipo..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-premium-pink"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <button onClick={fetchData} className="glass p-4 rounded-2xl hover:bg-white/10 transition-all">
            <Database size={20} className="text-premium-pink" />
          </button>
        </div>
      </div>

      {/* LISTADO DE JUGADORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtrados.map((jugador) => (
          <div key={jugador.codigo} className="bg-[#0f0f0f] rounded-[2rem] border border-white/5 p-6 hover:border-premium-pink/30 transition-all group relative overflow-hidden">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Users className="text-blue-400" size={32} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase italic relative z-10">{jugador.nombre}</h2>
            <div className="mb-4 relative z-10">
              <span className="text-premium-pink text-[9px] font-black uppercase px-3 py-1.5 bg-premium-pink/10 rounded-xl inline-block border border-premium-pink/20">
                {jugador.posicion}
              </span>
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase flex items-center gap-2 relative z-10">
              <Shield size={12}/> {jugador.equipoNombre}
            </p>
          </div>
        ))}
        {filtrados.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm">
            No se encontraron jugadores
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersDashboard;
