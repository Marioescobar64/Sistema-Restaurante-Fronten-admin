import { useReservationStore } from "../../users/store/reservationStore";
import { useTableStore } from "../../users/store/mesaStore";

export const useSaveReservation = () => {
  const createReservation = useReservationStore((state) => state.createReservation);
  const updateReservation = useReservationStore((state) => state.updateReservation);
  const tables = useTableStore((state) => state.tables);

  const saveReservation = async (data, reservationId = null) => {
    const estadoMap = {
      ACTIVA: "Activa",
      FINALIZADA: "Finalizada",
      CANCELADA: "Cancelada",
    };

    const normalize = (text) =>
      (text || "").toUpperCase().normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_").trim();

    const estadoFinal = estadoMap[normalize(data.estado)] || "Activa";

    // Buscar el número de mesa a partir del _id seleccionado
    const mesaSeleccionada = tables?.find((t) => t._id === data.mesa);
    const numeroMesa = mesaSeleccionada?.numeroMesa || mesaSeleccionada?.tableNumber || null;

    const payload = {
      eventoId:         data.evento  || null,          // _id del evento → eventoId
      mesaId:           data.mesa    || null,          // _id de la mesa → mesaId
      mesa:             Number(numeroMesa),             // número entero → mesa
      orderId:          data.orden   || null,          // _id de la orden → orderId
      usuario:          String(data.usuario || "").trim(),
      cantidadPersonas: Number(data.cantidadPersonas || 0),
      estado:           estadoFinal,
      descripcion:      String(data.descripcion || "").trim(),
      fecha:            data.fecha ? new Date(data.fecha).toISOString() : new Date().toISOString(),
      hora:             String(data.hora || "").trim(),
      ubicacion:        String(data.ubicacion || "").trim(),
    };

    if (reservationId) {
      await updateReservation(reservationId, payload);
    } else {
      await createReservation(payload);
    }
  };

  return { saveReservation };
};