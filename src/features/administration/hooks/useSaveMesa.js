import { useTableStore } from "../../users/store/mesaStore";

export const useSaveTable = () => {
  const createTable = useTableStore((state) => state.createTable);
  const updateTable = useTableStore((state) => state.updateTable);

  const saveTable = async (data, tableId = null) => {

    // 1. Mapear y normalizar los ESTADOS exactos que espera tu backend en el ENUM ('Disponible', 'Ocupada', 'Reservada')
    const estadoMap = {
      DISPONIBLE: "Disponible",
      OCUPADA: "Ocupada",
      RESERVADA: "Reservada",
    };

    // Normalizador de texto para emparejar la entrada del usuario con las llaves del mapa
    const normalize = (text) =>
      (text || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quita acentos
        .trim();

    const normalizedEstadoInput = normalize(data.estado || data.status);
    const estadoFinal = estadoMap[normalizedEstadoInput] || "Disponible";

    // 2. Construir el payload final estructurado en ESPAÑOL y sin manejo de fotos
    const payload = {
      descripcion: (data.descripcion || data.description || "").trim(),
      numeroMesa: Number(data.numeroMesa || data.tableNumber),
      capacidad: Math.floor(Number(data.capacidad || data.capacity)), // Forzamos a que sea un número entero
      estado: estadoFinal,
    };

    // 3. Crear o actualizar enviando el JSON plano (no se requiere FormData porque no hay fotos)
    if (tableId) {
      await updateTable(tableId, payload);
    } else {
      await createTable(payload);
    }
  };

  return { saveTable };
};