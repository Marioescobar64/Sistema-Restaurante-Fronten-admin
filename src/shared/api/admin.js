import { axiosAdmin } from "../../shared/api/api.js";

// Productos
export const getProducts = async () => {
  return await axiosAdmin.get("/product");
};

export const createProduct = async (data) => {
   return await axiosAdmin.post("/product", data);
   };
export const updateProduct = async (id, data) => { 
  return await axiosAdmin.put(`/product/${id}`, data); 
};
export const deactivateProduct = async (id) => 
  { return await axiosAdmin.put(`/product/${id}/deactivate`); 
};


// Menú
export const getMenuItems = async () => {
  return await axiosAdmin.get("/menu");
};

const buildFormDataConfig = (data) => ({ });

export const createMenuItem = async (data) => {
  return await axiosAdmin.post("/menu", data, buildFormDataConfig(data));
};

export const updateMenuItem = async (id, data) => {
  return await axiosAdmin.put(`/menu/${id}`, data, buildFormDataConfig(data));
};

export const deactivateMenuItem = async (id) => {
  return await axiosAdmin.put(`/menu/${id}/deactivate`);
};




// Órdenes
export const getOrders = async () => {
   return await axiosAdmin.get("/order"); };
export const createOrder = async (data) => { 
  return await axiosAdmin.post("/order", data); };
export const updateOrder = async (id, data) => { 
  return await axiosAdmin.put(`/order/${id}`, data); };

export const deactivateOrder = async (id, status) => {
   return await axiosAdmin.put(`/order/${id}`, { estado: status }); };

// Reservaciones
export const getReservations = async () => axiosAdmin.get("/reservation");
export const getReservationById = async (id) => axiosAdmin.get(`/reservation/${id}`);
export const createReservation = async (data) => axiosAdmin.post("/reservation", data);
export const updateReservation = async (id, data) => axiosAdmin.put(`/reservation/${id}`, data);
export const changeReservationStatus = async (id, status) => axiosAdmin.put(`/reservation/${id}`, { estado: status });

// Mesas
export const getTables = async () => {
   return await axiosAdmin.get("/table"); };

export const createTable = async (data) => { 
  return await axiosAdmin.post("/table", data); };

export const updateTable = async (id, data) => { 
  return await axiosAdmin.put(`/table/${id}`, data); };

export const deactivateTable = async (id, status) => {
   return await axiosAdmin.put(`/table/${id}`, { estado: status }); };


// Eventos
export const getEvents = async () => axiosAdmin.get("/event");
export const getEventById = async (id) => axiosAdmin.get(`/event/${id}`);
export const createEvent = async (data) => axiosAdmin.post("/event", data);
export const updateEvent = async (id, data) => axiosAdmin.put(`/event/${id}`, data);
export const changeEventStatus = async (id, status) => axiosAdmin.put(`/event/${id}`, { isActive: status });

// Mantenimiento
export const getMaintenanceRecords = async () => {
  return await axiosAdmin.get("/maintenance");
};

export const createMaintenanceRecord = async (data) => {
  return await axiosAdmin.post("/maintenance", data, buildFormDataConfig(data));
};

export const updateMaintenanceRecord = async (id, data) => {
  return await axiosAdmin.put(`/maintenance/${id}`, data, buildFormDataConfig(data));
};

export const deleteMaintenanceRecord = async (id) => {
  return await axiosAdmin.put(`/maintenance/${id}/deactivate`, { isActive: false });
};
// Carritos
export const getCarts = async () => axiosAdmin.get("/cart");
export const getCartById = async (id) => axiosAdmin.get(`/cart/${id}`);
export const createCart = async (data) => axiosAdmin.post("/cart", data);
export const updateCart = async (id, data) => axiosAdmin.put(`/cart/${id}`, data);

// Administración general
export const getAdministration = async () => api.get("/administration");
// export const getAdministrationById = async (id) => api.get(`/administration/${id}`);
export const createAdministration = async (data) => api.post("/administration", data);
export const updateAdministration = async (id, data) => api.put(`/administration/${id}`, data);
