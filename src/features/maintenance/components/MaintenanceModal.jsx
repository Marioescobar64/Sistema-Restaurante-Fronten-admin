import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMaintenanceStore } from "../../users/store/adminStore";
import { Spinner } from "@material-tailwind/react";
import { useSaveMaintenance } from "../../administration/hooks/useSaveMaintenance";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const MaintenanceModal = ({ isOpen, onClose, maintenance }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { saveMaintenance } = useSaveMaintenance();
  const loading = useMaintenanceStore((state) => state.loading);

  const [preview, setPreview] = useState(null);

  // 🔹 Cargar datos al editar
  useEffect(() => {
    if (isOpen) {
      if (maintenance) {
        reset({
          tableNumber: maintenance.tableNumber,
          capacity: maintenance.capacity,
          location: maintenance.location,
          status: maintenance.status,
        });

        setPreview(
          `https://res.cloudinary.com/dxsl6ww6y/image/upload/v1777998302/kinalSport/${maintenance.photo}`
        );
      } else {
        reset({
          tableNumber: "",
          capacity: "",
          location: "",
          status: "Disponible",
          photo: null,
        });
        setPreview(null);
      }
    }
  }, [isOpen, maintenance, reset]);

  // 🔹 Preview imagen
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "photo" && value.photo && value.photo.length > 0) {
        setPreview(URL.createObjectURL(value.photo[0]));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // 🔹 Submit
  const onSubmit = async (data) => {
    try {
      await saveMaintenance(data, maintenance?._id);

      showSuccess(
        maintenance
          ? "Mantenimiento actualizado correctamente"
          : "Mantenimiento creado correctamente"
      );

      reset();
      setPreview(null);
      onClose();
    } catch {
      showError("Error al guardar mantenimiento");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {maintenance ? "Editar Mesa" : "Nueva Mesa"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información del mantenimiento
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >

          {/* PREVIEW */}
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Sin imagen</span>
              )}
            </div>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Número de mesa */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Número de mesa</label>
              <input
                type="number"
                {...register("tableNumber", {
                  required: "El número es obligatorio",
                  min: { value: 1, message: "Debe ser mayor a 0" },
                })}
                className="input"
              />
              {errors.tableNumber && <p className="text-red-500 text-xs">{errors.tableNumber.message}</p>}
            </div>

            {/* Capacidad */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Capacidad</label>
              <input
                type="number"
                {...register("capacity", {
                  required: "La capacidad es obligatoria",
                  min: { value: 1, message: "Debe ser mayor a 0" },
                })}
                className="input"
              />
              {errors.capacity && <p className="text-red-500 text-xs">{errors.capacity.message}</p>}
            </div>

            {/* Ubicación */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Ubicación</label>
              <select
                {...register("location", {
                  required: "La ubicación es obligatoria",
                })}
                className="input"
              >
            <option value="SALON_PRINCIPAL">Salón Principal</option>
            <option value="TERRAZA">Terraza</option>
            <option value="AREA_VIP">Área VIP</option>
            <option value="JARDIN">Jardín</option>
            <option value="INTERIOR">Interior</option>
              </select>
              {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
            </div>

            {/* Estado */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Estado</label>
              <select {...register("status")} className="input">
              <option value="DISPONIBLE">Disponible</option>
              <option value="OCUPADA">Ocupada</option>
              <option value="RESERVADA">Reservada</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              </select>
            </div>

            {/* Imagen */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Imagen</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="input"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                reset();
                setPreview(null);
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : maintenance ? (
                "Guardar cambios"
              ) : (
                "Crear mesa"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};