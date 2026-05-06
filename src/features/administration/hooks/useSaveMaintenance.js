import { useMaintenanceStore } from "../../users/store/adminStore";

export const useSaveMaintenance = () => {
  const createMaintenance = useMaintenanceStore((state) => state.createMaintenance);
  const updateMaintenance = useMaintenanceStore((state) => state.updateMaintenance);

  const saveMaintenance = async (data, maintenanceId = null) => {

    // 🔹 ENUMS EXACTOS del backend
    const locationMap = {
      SALON_PRINCIPAL: "Salón Principal",
      TERRAZA: "Terraza",
      AREA_VIP: "Área VIP",
      JARDIN: "Jardín",
      INTERIOR: "Interior",
    };

    const statusMap = {
      DISPONIBLE: "Disponible",
      OCUPADA: "Ocupada",
      RESERVADA: "Reservada",
      MANTENIMIENTO: "Mantenimiento",
    };

    // 🔹 Normalizar (por si viene en mayúsculas o sin acentos)
    const normalize = (text) =>
      (text || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_");

    const normalizedLocation = normalize(data.location);
    const normalizedStatus = normalize(data.status);

    // 🔹 Payload final correcto
    const payload = {
      tableNumber: Number(data.tableNumber),
      capacity: Number(data.capacity),
      location: locationMap[normalizedLocation] || data.location,
      status: statusMap[normalizedStatus] || "Disponible",
    };

    let body = payload;

    const hasPhoto = data.photo?.length > 0;

    // 🔹 Manejo de imagen (igual que fields)
    if (hasPhoto) {
      const formData = new FormData();

      formData.append("tableNumber", payload.tableNumber);
      formData.append("capacity", payload.capacity);
      formData.append("location", payload.location);
      formData.append("status", payload.status);

      formData.append("image", data.photo[0]);

      body = formData;
    }

    // 🔹 CREATE / UPDATE
    if (maintenanceId) {
      await updateMaintenance(maintenanceId, body);
    } else {
      await createMaintenance(body);
    }
  };

  return { saveMaintenance };
};