import { axiosAdmin } from "../../shared/api/api.js";

// ================= TOURNAMENTS =================
export const getTournaments = async () => axiosAdmin.get("/tournaments");
export const createTournament = async (data) => axiosAdmin.post("/tournaments", data);
export const updateTournament = async (id, data) => axiosAdmin.put(`/tournaments/${id}`, data);
export const deleteTournament = async (id) => axiosAdmin.put(`/tournaments/${id}/deactivate`);

// ================= TEAMS =================
export const getTeams = async () => axiosAdmin.get("/teams");
export const createTeam = async (data) => axiosAdmin.post("/teams", data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const updateTeam = async (id, data) => axiosAdmin.put(`/teams/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const deleteTeam = async (id) => axiosAdmin.put(`/teams/${id}/deactivate`);

// ================= FIELDS =================
export const getFields = async () => axiosAdmin.get("/fields");
export const createField = async (data) => axiosAdmin.post("/fields", data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const updateField = async (id, data) => axiosAdmin.put(`/fields/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const deleteField = async (id) => axiosAdmin.put(`/fields/${id}/deactivate`);

// ================= PRODUCTS =================
export const getProducts = async () => axiosAdmin.get("/product");
export const getProductById = async (id) => axiosAdmin.get(`/product/${id}`);
export const createProduct = async (data) => axiosAdmin.post("/product", data);
export const updateProduct = async (id, data) => axiosAdmin.put(`/product/${id}`, data);
export const activateProduct = async (id) => axiosAdmin.put(`/product/${id}/activate`);
export const deactivateProduct = async (id) => axiosAdmin.put(`/product/${id}/deactivate`);

// ================= ORDERS =================
export const getOrders = async () => axiosAdmin.get("/order");
export const createOrder = async (data) => axiosAdmin.post("/order", data);
export const updateOrder = async (id, data) => axiosAdmin.put(`/order/${id}`, data);

// ================= RESERVATIONS =================
export const getReservations = async () => axiosAdmin.get("/reservation");
export const createReservation = async (data) => axiosAdmin.post("/reservation", data);
export const updateReservation = async (id, data) => axiosAdmin.put(`/reservation/${id}`, data);
export const changeReservationStatus = async (id, status) =>
    axiosAdmin.put(`/reservation/${id}`, { estado: status });