import { axiosAdmin } from "./api.js";

// Productos
export const getProducts = async () => {
  return await axiosAdmin.get("/product");
import axios from "axios";
import { axiosAdmin, DEFAULT_ADMIN_BASE } from "./api.js";

const buildFormDataConfig = (data) =>
  data instanceof FormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

// Create an alternate axios client that toggles presence of '/api/v1'
const computeAlternateBase = (base) => {
  try {
    if (typeof base !== "string") return base;
    if (base.endsWith("/api/v1")) return base.replace(/\/api\/v1$/, "");
    return base + "/api/v1";
  } catch (e) {
    return base;
  }
};

const axiosAdminAlt = axios.create({ baseURL: computeAlternateBase(DEFAULT_ADMIN_BASE), timeout: 80000 });

const tryRequest = async (fn) => {
  try {
    return await fn(axiosAdmin);
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404) {
      try {
        return await fn(axiosAdminAlt);
      } catch (err2) {
        throw err2;
      }
    }
    throw err;
  }
};

// Productos
export const getProducts = async () => await tryRequest((client) => client.get("/product"));
export const createProduct = async (data) => await tryRequest((client) => client.post("/product", data));
export const updateProduct = async (id, data) => await tryRequest((client) => client.put(`/product/${id}`, data));
export const deactivateProduct = async (id) => await tryRequest((client) => client.put(`/product/${id}/deactivate`));

// Menú
export const getMenuItems = async () => await tryRequest((client) => client.get("/menu"));
export const createMenuItem = async (data) => await tryRequest((client) => client.post("/menu", data, buildFormDataConfig(data)));
export const updateMenuItem = async (id, data) => await tryRequest((client) => client.put(`/menu/${id}`, data, buildFormDataConfig(data)));
export const deactivateMenuItem = async (id) => await tryRequest((client) => client.put(`/menu/${id}/deactivate`));

// Órdenes
export const getOrders = async () => await tryRequest((client) => client.get("/order"));
export const createOrder = async (data) => await tryRequest((client) => client.post("/order", data));
export const updateOrder = async (id, data) => await tryRequest((client) => client.put(`/order/${id}`, data));
export const deactivateOrder = async (id, status) => await tryRequest((client) => client.put(`/order/${id}`, { estado: status }));

// Reservaciones
export const getReservations = async () => await tryRequest((client) => client.get("/reservation"));
export const getReservationById = async (id) => await tryRequest((client) => client.get(`/reservation/${id}`));
export const createReservation = async (data) => await tryRequest((client) => client.post("/reservation", data));
export const updateReservation = async (id, data) => await tryRequest((client) => client.put(`/reservation/${id}`, data));
export const changeReservationStatus = async (id, status) => await tryRequest((client) => client.put(`/reservation/${id}`, { estado: status }));

// Mesas
export const getTables = async () => await tryRequest((client) => client.get("/table"));
export const createTable = async (data) => await tryRequest((client) => client.post("/table", data));
export const updateTable = async (id, data) => await tryRequest((client) => client.put(`/table/${id}`, data));
export const deactivateTable = async (id, status) => await tryRequest((client) => client.put(`/table/${id}`, { estado: status }));

// Eventos
export const getEvents = async () => await tryRequest((client) => client.get("/event"));
export const getEventById = async (id) => await tryRequest((client) => client.get(`/event/${id}`));
export const createEvent = async (data) => await tryRequest((client) => client.post("/event", data));
export const updateEvent = async (id, data) => await tryRequest((client) => client.put(`/event/${id}`, data));
export const changeEventStatus = async (id, status) => await tryRequest((client) => client.put(`/event/${id}`, { isActive: status }));

// Mantenimiento
export const getMaintenanceRecords = async () => await tryRequest((client) => client.get("/maintenance"));
export const createMaintenanceRecord = async (data) => await tryRequest((client) => client.post("/maintenance", data, buildFormDataConfig(data)));
export const updateMaintenanceRecord = async (id, data) => await tryRequest((client) => client.put(`/maintenance/${id}`, data, buildFormDataConfig(data)));
export const deleteMaintenanceRecord = async (id) => await tryRequest((client) => client.put(`/maintenance/${id}/deactivate`, { isActive: false }));

// Carritos
export const getCarts = async () => await tryRequest((client) => client.get("/cart"));
export const getCartById = async (id) => await tryRequest((client) => client.get(`/cart/${id}`));
export const createCart = async (data) => await tryRequest((client) => client.post("/cart", data));
export const updateCart = async (id, data) => await tryRequest((client) => client.put(`/cart/${id}`, data));

// Administración general
export const getAdministration = async () => await tryRequest((client) => client.get("/administration"));
export const createAdministration = async (data) => await tryRequest((client) => client.post("/administration", data));
export const updateAdministration = async (id, data) => await tryRequest((client) => client.put(`/administration/${id}`, data));
  return await axiosAdmin.put(`/maintenance/${id}/deactivate`, { isActive: false });
