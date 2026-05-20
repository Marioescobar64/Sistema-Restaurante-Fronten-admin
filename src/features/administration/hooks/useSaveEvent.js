import { useEventStore } from "../../users/store/eventStore";

export const useSaveEvent = () => {
  const createEvent = useEventStore((state) => state.createEvent);
  const updateEvent = useEventStore((state) => state.updateEvent);

  const saveEvent = async (data, eventId = null) => {
    const payload = {
      nombreEvento:  String(data.nombreEvento || "").trim(),
      descripcion:   String(data.descripcion  || "").trim(),
      fechaInicio:   new Date(data.fechaInicio).toISOString(),
      fechaFin:      new Date(data.fechaFin).toISOString(),
      horaInicio:    String(data.horaInicio || "").trim(),
      horaFin:       String(data.horaFin    || "").trim(),
      estado:        data.estado || "Programado",
      observaciones: String(data.observaciones || "Sin observaciones").trim(),
      isActive:      data.isActive !== undefined ? data.isActive : true,
    };
    // No incluir "fecha" — el backend lo rechaza si no es ISO válido

    if (eventId) {
      await updateEvent(eventId, payload);
    } else {
      await createEvent(payload);
    }
  };

  return { saveEvent };
};