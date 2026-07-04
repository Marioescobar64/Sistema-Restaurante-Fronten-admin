import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3001/papaluigi/v1'; // TODO: use environment variable

const STAFF_ROLES = [
  { value: 'GERENTE_ROLE', label: 'Gerente de Sucursal' },
  { value: 'CHEF_ROLE', label: 'Chef' },
  { value: 'MESERO_ROLE', label: 'Mesero' },
];

export const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [formData, setFormData] = useState({ name: '', branchType: 'Restaurante' });
  const [assignFormData, setAssignFormData] = useState({
    role: 'CHEF_ROLE',
    selectedUsers: [],
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users`);
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchUsers();
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

  const handleAddUserToAssignment = (userId) => {
    setAssignFormData((prev) => {
      const isAlreadySelected = prev.selectedUsers.some((u) => u.id === userId);
      if (isAlreadySelected) {
        return {
          ...prev,
          selectedUsers: prev.selectedUsers.filter((u) => u.id !== userId),
        };
      }
      const user = users.find((u) => u._id === userId);
      return {
        ...prev,
        selectedUsers: [...prev.selectedUsers, { id: userId, name: user?.nombre }],
      };
    });
  };

  const handleAssignStaff = async (e) => {
    e.preventDefault();
    if (assignFormData.selectedUsers.length === 0) {
      return toast.error('Selecciona al menos un usuario');
    }

    try {
      const payload = {
        role: assignFormData.role,
        staffIds: assignFormData.selectedUsers.map((u) => u.id),
      };
      await axios.post(`${API_URL}/branch/${selectedBranchId}/assign-staff`, payload);
      toast.success('Personal asignado exitosamente');
      setShowAssignForm(false);
      setAssignFormData({ role: 'CHEF_ROLE', selectedUsers: [] });
      setSearchTerm('');
      fetchBranches();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al asignar personal';
      toast.error(message);
    }
  };

  const getFilteredUsers = () => {
    const currentBranchStaffIds = branches
      .find((b) => b._id === selectedBranchId)
      ?.assignedStaff?.map((s) => s.user?._id)
      .filter(Boolean) || [];

    return users.filter((user) => {
      const matchesRole = user.rol === assignFormData.role;
      const notAssignedToBranch = !currentBranchStaffIds.includes(user._id);
      const matchesSearch =
        user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && notAssignedToBranch && matchesSearch;
    });
  };

  const openAssignForm = (branchId) => {
    setSelectedBranchId(branchId);
    setShowAssignForm(true);
    setAssignFormData({ role: 'CHEF_ROLE', selectedUsers: [] });
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <form onSubmit={handleAssignStaff} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md mb-6 border-2 border-blue-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Asignar Personal a la Sucursal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol del Personal</label>
              <select
                value={assignFormData.role}
                onChange={(e) => {
                  setAssignFormData({ ...assignFormData, role: e.target.value, selectedUsers: [] });
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
              >
                {STAFF_ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Usuarios</label>
              <input
                type="text"
                placeholder="Busca por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona Usuarios ({assignFormData.selectedUsers.length})
            </label>
            <div className="border-2 border-blue-300 rounded-lg p-3 bg-white max-h-64 overflow-y-auto">
              {getFilteredUsers().length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  {users.length === 0
                    ? 'No hay usuarios disponibles'
                    : `No hay usuarios disponibles con rol ${assignFormData.role}`}
                </p>
              ) : (
                <div className="space-y-2">
                  {getFilteredUsers().map((user) => (
                    <label key={user._id} className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={assignFormData.selectedUsers.some((u) => u.id === user._id)}
                        onChange={() => handleAddUserToAssignment(user._id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{user.nombre}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {assignFormData.selectedUsers.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuarios Seleccionados
              </label>
              <div className="flex flex-wrap gap-2">
                {assignFormData.selectedUsers.map((user) => (
                  <span
                    key={user.id}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {user.name}
                    <button
                      type="button"
                      onClick={() => handleAddUserToAssignment(user.id)}
                      className="hover:bg-blue-700 rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Asignar Personal
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAssignForm(false);
                setAssignFormData({ role: 'CHEF_ROLE', selectedUsers: [] });
                setSearchTerm('');
              }}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
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
                <h4 className="font-semibold text-sm text-gray-700 mb-2 border-b pb-1">Personal Asignado ({branch.assignedStaff?.length || 0})</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {branch.assignedStaff?.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">Sin personal asignado</p>
                  ) : (
                    branch.assignedStaff?.map((assignment) => (
                      <div key={assignment._id || Math.random()} className="flex flex-col bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded text-sm mb-2 border border-blue-200">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-gray-800">{assignment.user?.nombre || 'Usuario'}</span>
                          <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">
                            {assignment.role === 'GERENTE_ROLE' && 'Gerente'}
                            {assignment.role === 'CHEF_ROLE' && 'Chef'}
                            {assignment.role === 'MESERO_ROLE' && 'Mesero'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {assignment.user?.email}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="bg-gray-50 p-3 border-t">
                <button 
                  onClick={() => openAssignForm(branch._id)}
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

