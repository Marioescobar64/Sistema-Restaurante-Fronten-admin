import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3001/papaluigi/v1'; // TODO: use environment variable

export const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [formData, setFormData] = useState({ name: '', branchType: 'Restaurante' });
  const [staffId, setStaffId] = useState('');

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/branch`);
      setBranches(data.data || []);
    } catch (error) {
      toast.error('Error al obtener sucursales');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/branch`, formData);
      toast.success('Sucursal creada exitosamente');
      setShowForm(false);
      setFormData({ name: '', branchType: 'Restaurante' });
      fetchBranches();
    } catch (error) {
      toast.error('Error al crear sucursal');
    }
  };

  const handleAssignStaff = async (e) => {
    e.preventDefault();
    if (!staffId.trim()) return toast.error('Ingresa un ID de staff válido');

    try {
      await axios.post(`${API_URL}/branch/${selectedBranchId}/assign-staff`, { staffId });
      toast.success('Staff asignado exitosamente');
      setShowAssignForm(false);
      setStaffId('');
      fetchBranches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al asignar staff');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Sucursales</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          {showForm ? 'Cancelar' : 'Nueva Sucursal'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Crear Nueva Sucursal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={formData.branchType}
                onChange={(e) => setFormData({ ...formData, branchType: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="Restaurante">Restaurante</option>
                <option value="Bar">Bar</option>
                <option value="Cafetería">Cafetería</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Guardar
          </button>
        </form>
      )}

      {showAssignForm && (
        <form onSubmit={handleAssignStaff} className="bg-gray-50 p-6 rounded-xl shadow-sm mb-6 border border-blue-200">
          <h2 className="text-xl font-semibold mb-4">Asignar Staff a la Sucursal</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ingresa el ID del Staff (Administrador)"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Asignar
            </button>
            <button type="button" onClick={() => setShowAssignForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Cargando sucursales...</p>
        ) : branches.length === 0 ? (
          <p className="text-gray-500">No hay sucursales registradas.</p>
        ) : (
          branches.map((branch) => (
            <div key={branch._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-gray-50 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{branch.name}</h3>
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md font-medium mt-1">
                    {branch.branchType}
                  </span>
                </div>
                <div className="text-xs text-gray-400">ID: {branch._id.substring(18)}</div>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 border-b pb-1">Staff Asignado ({branch.assignedStaff?.length || 0})</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {branch.assignedStaff?.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">Sin personal asignado</p>
                  ) : (
                    branch.assignedStaff?.map((staff) => (
                      <div key={staff._id || Math.random()} className="flex flex-col bg-gray-50 p-2 rounded text-sm mb-2">
                        <span className="font-medium text-blue-700">{staff.restaurantName} (ID: {staff._id?.substring(18)})</span>
                        <div className="text-xs text-gray-600 mt-1 pl-2 border-l-2 border-blue-200">
                          {staff.administrators?.map(a => `${a.nombre} ${a.apellido} (${a.rol})`).join(' • ')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="bg-gray-50 p-3 border-t">
                <button 
                  onClick={() => {
                    setSelectedBranchId(branch._id);
                    setShowAssignForm(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-1.5 rounded transition-colors"
                >
                  + Asignar Personal
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
