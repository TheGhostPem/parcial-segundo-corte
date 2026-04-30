import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';
import { Trophy, Users, Shield, MapPin, Database, Plus, Edit, Trash2, Search } from 'lucide-react';

const LeagueDashboard = () => {
  // --- ESTADOS (Hooks) ---
  const [equipos, setEquipos] = useState([]); // Almacena la lista de equipos
  const [stats, setStats] = useState({ totalEquipos: 0, totalJugadores: 0, totalPresidentes: 0 }); // Estadísticas (RF-02)
  const [loading, setLoading] = useState(true); // Estado de carga
  const [busqueda, setBusqueda] = useState(''); // Estado para el filtro de búsqueda

  // --- EFECTOS ---
  useEffect(() => {
    fetchData(); // Cargar datos al montar el componente
  }, []);

  // --- LÓGICA DE DATOS ---
  const fetchData = async () => {
    try {
      // Petición paralela al backend (RF-02 y RF-03)
      const [resLiga, resStats] = await Promise.all([
        api.get('/info'),
        api.get('/stats')
      ]);
      if (resLiga.data.success) setEquipos(resLiga.data.data);
      if (resStats.data.success) setStats(resStats.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setLoading(false);
    }
  };

  // --- GESTIÓN CRUD (RF-03 y RF-04) ---
  const handleEliminar = async (codigo, nombre) => {
    // Confirmación con SweetAlert2 (Prohibido window.confirm)
    const result = await Swal.fire({
      title: '¿Eliminar registro?',
      text: `¿Seguro que deseas eliminar a ${nombre}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/equipos/${codigo}`);
        Swal.fire('Eliminado', 'El registro fue eliminado correctamente.', 'success');
        fetchData(); // Refrescar lista
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
      }
    }
  };

  const handleCrearEditar = async (equipo = null) => {
    // Formulario controlado mediante SweetAlert2
    const { value: formValues } = await Swal.fire({
      title: equipo ? 'Editar Registro' : 'Nuevo Registro',
      html: `
        <input id="swal-codigo" class="swal2-input" placeholder="Código" value="${equipo ? equipo.codigo : ''}" ${equipo ? 'disabled' : ''}>
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${equipo ? equipo.nombre : ''}">
        <input id="swal-ciudad" class="swal2-input" placeholder="Ciudad" value="${equipo ? equipo.ciudad : ''}">
        <input id="swal-estadio" class="swal2-input" placeholder="Estadio" value="${equipo ? equipo.estadio : ''}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        return {
          codigo: document.getElementById('swal-codigo').value,
          nombre: document.getElementById('swal-nombre').value,
          ciudad: document.getElementById('swal-ciudad').value,
          estadio: document.getElementById('swal-estadio').value
        }
      }
    });

    if (formValues) {
      try {
        if (equipo) {
          await api.put(`/equipos/${equipo.codigo}`, formValues); // Actualizar (PUT)
          Swal.fire('Actualizado', 'Registro actualizado con éxito', 'success');
        } else {
          await api.post('/equipos', formValues); // Crear (POST)
          Swal.fire('Creado', 'Registro creado con éxito', 'success');
        }
        fetchData();
      } catch (err) {
        Swal.fire('Error', 'No se pudo procesar la solicitud', 'error');
      }
    }
  };

  const handleNombrarPresidente = async (equipoCodigo) => {
    const { value: formValues } = await Swal.fire({
      title: 'Nombrar Presidente',
      html: `
        <input id="swal-dni" class="swal2-input" placeholder="DNI">
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
        <input id="swal-apellidos" class="swal2-input" placeholder="Apellidos">
        <input id="swal-anio" type="number" class="swal2-input" placeholder="Año de Inicio">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Nombrar',
      preConfirm: () => {
        return {
          dni: document.getElementById('swal-dni').value,
          nombre: document.getElementById('swal-nombre').value,
          apellidos: document.getElementById('swal-apellidos').value,
          año_inicio: document.getElementById('swal-anio').value,
          equipo_codigo: equipoCodigo
        }
      }
    });

    if (formValues) {
      try {
        await api.post('/presidentes', formValues);
        Swal.fire('Éxito', 'Presidente nombrado correctamente', 'success');
        fetchData();
      } catch (err) {
        Swal.fire('Error', 'No se pudo nombrar al presidente', 'error');
      }
    }
  };

  const handleFicharJugador = async (equipoCodigo) => {
    const { value: formValues } = await Swal.fire({
      title: 'Fichar Jugador',
      html: `
        <input id="swal-codigo" class="swal2-input" placeholder="Código Único (Ej: J10)">
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre Completo">
        <input id="swal-posicion" class="swal2-input" placeholder="Posición (Ej: Delantero)">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Fichar',
      preConfirm: () => {
        return {
          codigo: document.getElementById('swal-codigo').value,
          nombre: document.getElementById('swal-nombre').value,
          posicion: document.getElementById('swal-posicion').value,
          equipo_codigo: equipoCodigo
        }
      }
    });

    if (formValues) {
      try {
        await api.post('/jugadores', formValues);
        Swal.fire('Éxito', 'Jugador fichado correctamente', 'success');
        fetchData();
      } catch (err) {
        Swal.fire('Error', 'No se pudo fichar al jugador', 'error');
      }
    }
  };

  // --- FILTRO DE BÚSQUEDA ---
  // Añadimos ?. para evitar que la app explote si algún dato viene nulo o vacío
  const equiposFiltrados = equipos.filter(e => 
    e.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || 
    e.ciudad?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // --- CONTROL DE ACCESO (RF-05) ---
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.rol === 'admin';

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-premium-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl w-full p-6 md:p-10">
      
      {/* TARJETAS DE RESUMEN (RF-02) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-8 rounded-3xl border border-white/5 flex items-center gap-6">
          <div className="bg-premium-pink/20 p-4 rounded-2xl"><Trophy className="text-premium-pink" size={32} /></div>
          <div><p className="text-[10px] text-gray-500 font-black uppercase">Equipos</p><p className="text-3xl font-black">{stats.totalEquipos}</p></div>
        </div>
        <div className="glass p-8 rounded-3xl border border-white/5 flex items-center gap-6">
          <div className="bg-blue-500/20 p-4 rounded-2xl"><Users className="text-blue-400" size={32} /></div>
          <div><p className="text-[10px] text-gray-500 font-black uppercase">Jugadores</p><p className="text-3xl font-black">{stats.totalJugadores}</p></div>
        </div>
        <div className="glass p-8 rounded-3xl border border-white/5 flex items-center gap-6">
          <div className="bg-green-500/20 p-4 rounded-2xl"><Shield className="text-green-400" size={32} /></div>
          <div><p className="text-[10px] text-gray-500 font-black uppercase">Presidentes</p><p className="text-3xl font-black">{stats.totalPresidentes}</p></div>
        </div>
      </div>

      {/* BARRA DE HERRAMIENTAS: BÚSQUEDA Y CREACIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o ciudad..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-premium-pink"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          {/* RF-05: Solo el ADMIN ve el botón de crear */}
          {isAdmin && (
            <button onClick={() => handleCrearEditar()} className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-premium-pink transition-all flex items-center gap-2 shadow-xl">
              <Plus size={20} /> NUEVO REGISTRO
            </button>
          )}
          <button onClick={fetchData} className="glass p-4 rounded-2xl hover:bg-white/10 transition-all">
            <Database size={20} className="text-premium-pink" />
          </button>
        </div>
      </div>

      {/* LISTADO DE EQUIPOS EN TARJETAS (CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equiposFiltrados.map((equipo) => (
          <div key={equipo.codigo} className="bg-[#0f0f0f] rounded-[2.5rem] border border-white/5 p-8 hover:border-premium-pink/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                <Trophy className="text-premium-pink" size={32} />
              </div>
              {/* RF-05: Solo el ADMIN ve botones de edición/borrado */}
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => handleCrearEditar(equipo)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit size={16} /></button>
                  <button onClick={() => handleEliminar(equipo.codigo, equipo.nombre)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-black text-white mb-1 tracking-tighter uppercase italic">{equipo.nombre}</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase mb-6 flex items-center gap-2"><MapPin size={12}/> {equipo.ciudad} • {equipo.estadio}</p>
            
            {/* Detalles del equipo: Presidente y Jugadores */}
            <div className="space-y-4 border-t border-white/5 pt-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Presidente</p>
                  {isAdmin && !equipo.presidente && (
                    <button onClick={() => handleNombrarPresidente(equipo.codigo)} className="text-[9px] bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-2 py-1 rounded transition-colors uppercase font-black">Nombrar</button>
                  )}
                </div>
                <p className="text-sm font-bold text-white flex items-center gap-2 bg-white/5 p-3 rounded-2xl">
                  <Shield size={16} className="text-green-400"/> 
                  {equipo.presidente ? `${equipo.presidente.nombre} ${equipo.presidente.apellidos}` : 'Sin asignar'}
                </p>
              </div>
              
              <div>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-3 flex justify-between items-center">
                  Plantilla
                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-2 py-0.5 rounded-full text-white">{equipo.jugadores?.length || 0}</span>
                    {isAdmin && (
                      <button onClick={() => handleFicharJugador(equipo.codigo)} className="text-[9px] bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-2 py-1 rounded transition-colors uppercase font-black"><Plus size={10} className="inline mr-1"/>Fichar</button>
                    )}
                  </div>
                </p>
                <div className="flex flex-col gap-2">
                  {equipo.jugadores?.map(jugador => (
                    <div key={jugador.codigo} className="bg-white/5 px-4 py-3 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Users size={14} className="text-blue-400" />
                        <span className="text-xs font-bold text-white">{jugador.nombre}</span>
                      </div>
                      <span className="text-[9px] text-premium-pink uppercase font-black bg-premium-pink/10 px-2 py-1 rounded-lg">{jugador.posicion}</span>
                    </div>
                  ))}
                  {(!equipo.jugadores || equipo.jugadores.length === 0) && (
                    <p className="text-xs text-gray-600 italic px-2">No hay jugadores registrados</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueDashboard;
