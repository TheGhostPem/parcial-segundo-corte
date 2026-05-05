/**
 * @fileoverview Dashboard de Competición (Partidos y Goles).
 * Permite visualizar el historial de partidos y registrar nuevos eventos.
 */
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';
import { CalendarClock, Shield, Goal, Flag, Plus } from 'lucide-react';

/**
 * Componente funcional para el tablero de Competición.
 * Muestra el marcador de los partidos y permite a los administradores
 * programar nuevos partidos y registrar goles.
 * 
 * @component
 * @returns {JSX.Element}
 */
const CompetitionDashboard = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.rol === 'admin';

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Carga la información de partidos, equipos y jugadores.
   * Utiliza peticiones paralelas para mejorar el rendimiento.
   * 
   * @async
   */
  const fetchData = async () => {
    try {
      const [resPartidos, resEquipos, resJugadores] = await Promise.all([
        api.get('/partidos'),
        api.get('/info'),
        api.get('/jugadores')
      ]);
      
      if (resPartidos.data.success) setPartidos(resPartidos.data.data);
      if (resEquipos.data.success) setEquipos(resEquipos.data.data);
      if (resJugadores.data.success) setJugadores(resJugadores.data.data);
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleProgramarPartido = async () => {
    let options = equipos.map(e => `<option value="${e.codigo}">${e.nombre}</option>`).join('');
    
    const { value: formValues } = await Swal.fire({
      title: 'Programar Partido',
      html: `
        <input id="swal-fecha" type="date" class="swal2-input">
        <select id="swal-local" class="swal2-select w-[80%] mx-auto block mb-4">
          <option value="" disabled selected>Selecciona Equipo Local</option>
          ${options}
        </select>
        <select id="swal-visitante" class="swal2-select w-[80%] mx-auto block">
          <option value="" disabled selected>Selecciona Equipo Visitante</option>
          ${options}
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Programar',
      preConfirm: () => {
        return {
          fecha: document.getElementById('swal-fecha').value,
          equipo_local_codigo: document.getElementById('swal-local').value,
          equipo_visitante_codigo: document.getElementById('swal-visitante').value,
          goles_local: 0,
          goles_visitante: 0
        }
      }
    });

    if (formValues) {
      try {
        await api.post('/partidos', formValues);
        Swal.fire('Éxito', 'Partido programado', 'success');
        fetchData();
      } catch (err) {
        Swal.fire('Error', 'No se pudo programar', 'error');
      }
    }
  };

  const handleRegistrarGol = async (partidoId) => {
    let options = jugadores.map(j => `<option value="${j.codigo}">${j.nombre} (${j.equipo?.nombre || 'Sin equipo'})</option>`).join('');

    const { value: formValues } = await Swal.fire({
      title: 'Registrar Gol',
      html: `
        <input id="swal-minuto" type="number" class="swal2-input" placeholder="Minuto (Ej: 45)">
        <input id="swal-desc" class="swal2-input" placeholder="Descripción breve">
        <select id="swal-jugador" class="swal2-select w-[80%] mx-auto block">
          <option value="" disabled selected>Selecciona Jugador Anotador</option>
          ${options}
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Registrar Gol',
      preConfirm: () => {
        return {
          minuto: document.getElementById('swal-minuto').value,
          descripcion: document.getElementById('swal-desc').value,
          jugador_codigo: document.getElementById('swal-jugador').value,
          partido_id: partidoId
        }
      }
    });

    if (formValues) {
      try {
        await api.post('/goles', formValues);
        Swal.fire('¡GOLAZO!', 'Gol registrado correctamente', 'success');
        fetchData();
      } catch (err) {
        Swal.fire('Error', 'No se pudo registrar', 'error');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-premium-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-5xl w-full p-6 md:p-10 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4 text-white">
            Fase de <span className="text-premium-pink">Grupos</span>
          </h1>
          <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs max-w-lg">
            Resultados oficiales de la jornada
          </p>
        </div>
        {isAdmin && (
          <button onClick={handleProgramarPartido} className="bg-premium-pink text-black px-6 py-4 rounded-2xl font-black hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,174,201,0.3)] mt-6 md:mt-0">
            <Plus size={20} /> PROGRAMAR PARTIDO
          </button>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {partidos.map((partido) => (
          <div key={partido.id} className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden group hover:border-premium-pink/30 transition-all">
            
            {/* Header del Partido */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <CalendarClock size={16} className="text-gray-500" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">{partido.fecha}</span>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <Flag size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Jornada 1</span>
              </div>
            </div>

            {/* Marcador Central */}
            <div className="flex items-center justify-between mb-10">
              {/* Equipo Local */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-4 border border-white/10 shadow-lg">
                  <Shield className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase italic text-center leading-none">{partido.equipo_local?.nombre}</h3>
              </div>

              {/* Resultado */}
              <div className="flex flex-col items-center px-8">
                <div className="flex items-center gap-6">
                  <span className={`text-6xl font-black ${partido.goles_local > partido.goles_visitante ? 'text-premium-pink' : 'text-white'}`}>
                    {partido.goles_local}
                  </span>
                  <span className="text-2xl font-black text-gray-600">-</span>
                  <span className={`text-6xl font-black ${partido.goles_visitante > partido.goles_local ? 'text-premium-pink' : 'text-white'}`}>
                    {partido.goles_visitante}
                  </span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 mt-4 bg-white/5 px-4 py-1.5 rounded-full">Finalizado</span>
              </div>

              {/* Equipo Visitante */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-4 border border-white/10 shadow-lg">
                  <Shield className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase italic text-center leading-none">{partido.equipo_visitante?.nombre}</h3>
              </div>
            </div>

            {/* Eventos / Goles */}
            {partido.goles && partido.goles.length > 0 && (
              <div className="bg-[#050505] rounded-3xl p-6 border border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <Goal size={14} className="text-premium-pink" /> Resumen de Goles
                </h4>
                <div className="flex flex-col gap-3">
                  {partido.goles.map((gol) => (
                    <div key={gol.id} className="flex items-center gap-4 text-sm font-bold bg-white/5 px-4 py-3 rounded-2xl">
                      <span className="text-premium-pink w-10 text-right">{gol.minuto}'</span>
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      <span className="text-white flex-1">{gol.anotador?.nombre}</span>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest">{gol.descripcion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {partido.goles?.length === 0 && (
              <div className="text-center text-xs font-bold text-gray-600 uppercase tracking-widest py-4">
                Empate a Cero
              </div>
            )}

            {isAdmin && (
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                <button onClick={() => handleRegistrarGol(partido.id)} className="bg-white/5 text-gray-400 hover:text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 text-xs uppercase tracking-widest">
                  <Goal size={16} className="text-premium-pink" /> Registrar Gol
                </button>
              </div>
            )}

          </div>
        ))}

        {partidos.length === 0 && (
          <div className="text-center text-gray-500 font-bold uppercase tracking-widest text-sm py-20">
            No hay partidos registrados en esta jornada
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionDashboard;
