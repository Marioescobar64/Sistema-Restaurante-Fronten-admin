import { axiosAdmin } from "../../shared/api/api.js";

// Productos
export const getProducts = async () => api.get("/product");
export const getProductById = async (id) => api.get(`/product/${id}`);
export const createProduct = async (data) => api.post("/product", data);
export const updateProduct = async (id, data) => api.put(`/product/${id}`, data);
export const activateProduct = async (id) => api.put(`/product/${id}/activate`);
export const deactivateProduct = async (id) => api.put(`/product/${id}/deactivate`);


// Menú
export const getMenuItems = async () => {
  return await axiosAdmin.get("/menu");
};

export const createMenuItem = async (data) => {
  console.log('Sending data to /menu:', data);
  return await axiosAdmin.post("/menu", data);
};

export const updateMenuItem = async (id, data) => {
  return await axiosAdmin.put(`/menu/${id}`, data);
};

export const deactivateMenuItem = async (id) => {
  return await axiosAdmin.put(`/menu/${id}/deactivate`);
};




// Órdenes
export const getOrders = async () => api.get("/order");
export const getOrderById = async (id) => api.get(`/order/${id}`);
export const createOrder = async (data) => api.post("/order", data);
export const updateOrder = async (id, data) => api.put(`/order/${id}`, data);
export const changeOrderStatus = async (id, status) => api.put(`/order/${id}`, { estado: status });

// Reservaciones
export const getReservations = async () => api.get("/reservation");
export const getReservationById = async (id) => api.get(`/reservation/${id}`);
export const createReservation = async (data) => api.post("/reservation", data);
export const updateReservation = async (id, data) => api.put(`/reservation/${id}`, data);
export const changeReservationStatus = async (id, status) => api.put(`/reservation/${id}`, { estado: status });

// Mesas
export const getTables = async () => api.get("/table");
export const getTableById = async (id) => api.get(`/table/${id}`);
export const createTable = async (data) => api.post("/table", data);
export const updateTable = async (id, data) => api.put(`/table/${id}`, data);
export const changeTableStatus = async (id, status) => api.put(`/table/${id}`, { estado: status });

// Eventos
export const getEvents = async () => api.get("/event");
export const getEventById = async (id) => api.get(`/event/${id}`);
export const createEvent = async (data) => api.post("/event", data);
export const updateEvent = async (id, data) => api.put(`/event/${id}`, data);
export const changeEventStatus = async (id, status) => api.put(`/event/${id}`, { isActive: status });

// Mantenimiento
export const getMaintenanceRecords = async () => {
  return await axiosAdmin.get("/maintenance");
};

export const createMaintenanceRecord = async (data) => {
  return await axiosAdmin.post("/maintenance", data);
};

export const updateMaintenanceRecord = async (id, data) => {
  return await axiosAdmin.put(`/maintenance/${id}`, data);
};

export const deleteMaintenanceRecord = async (id) => {
  return await axiosAdmin.put(`/maintenance/${id}/deactivate`);
};
// Carritos
export const getCarts = async () => api.get("/cart");
export const getCartById = async (id) => api.get(`/cart/${id}`);
export const createCart = async (data) => api.post("/cart", data);
export const updateCart = async (id, data) => api.put(`/cart/${id}`, data);

// Administración general
export const getAdministration = async () => api.get("/administration");
// export const getAdministrationById = async (id) => api.get(`/administration/${id}`);
export const createAdministration = async (data) => api.post("/administration", data);
export const updateAdministration = async (id, data) => api.put(`/administration/${id}`, data);
