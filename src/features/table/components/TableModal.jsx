import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTableStore } from "../../users/store/mesaStore";
import { Spinner } from "@material-tailwind/react";
import { useSaveTable } from "../../administration/hooks/useSaveMesa.js"; // Tu hook de guardado adaptado
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const TableModal = ({ isOpen, onClose, table }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveTable } = useSaveTable();
  const loading = useTableStore((state) => state.loading);

  // 🔹 Cargar datos de la mesa al editar (usando las propiedades en español de tu backend)
  useEffect(() => {
    if (isOpen) {
      if (table) {
        reset({
          descripcion: table.descripcion,
          numeroMesa: table.numeroMesa,
          capacidad: table.capacidad,
          estado: table.estado,
        });
      } else {
        reset({
          descripcion: "",
          numeroMesa: "",
          capacidad: "",
          estado: "Disponible",
        });
      }
    }
  }, [isOpen, table, reset]);

  // 🔹 Enviar datos al Hook
  const onSubmit = async (data) => {
    try {
      // Pasamos los datos limpios al hook saveTable
      await saveTable(data, table?._id);

      showSuccess(
        table
          ? "Mesa actualizada correctamente"
          : "Mesa creada correctamente"
      );

      reset();
      onClose();
    } catch (error) {
      showError(error.message || "Error al guardar la mesa");
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
            {table ? "Editar Mesa" : "Nueva Mesa"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información para gestionar las mesas del restaurante
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >
          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Descripción (Requerido en tu esquema de Mongoose) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Descripción de la Mesa</label>
              <input
                type="text"
                placeholder="Ej. Mesa junto a la ventana, Mesa familiar terraza, etc."
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                })}
                className="input"
              />
              {errors.descripcion && (
                <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
              )}
            </div>

            {/* Número de Mesa */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Número de Mesa</label>
              <input
                type="number"
                placeholder="Ej. 1"
                {...register("numeroMesa", {
                  required: "El número es obligatorio",
                  min: { value: 1, message: "El número de mesa debe ser al menos 1" },
                })}
                className="input"
              />
              {errors.numeroMesa && (
                <p className="text-red-500 text-xs mt-1">{errors.numeroMesa.message}</p>
              )}
            </div>

            {/* Capacidad */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Capacidad (Personas)</label>
              <input
                type="number"
                placeholder="Ej. 4"
                {...register("capacidad", {
                  required: "La capacidad es obligatoria",
                  min: { value: 1, message: "La capacidad mínima debe ser de 1 persona" },
                  validate: (value) =>
                    Number.isInteger(Number(value)) || "Debe ser un número entero",
                })}
                className="input"
              />
              {errors.capacidad && (
                <p className="text-red-500 text-xs mt-1">{errors.capacidad.message}</p>
              )}
            </div>

            {/* Estado (Coincide con los Enums del Schema) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Estado de la Mesa</label>
              <select
                {...register("estado", {
                  required: "El estado es obligatorio",
                })}
                className="input"
              >
                <option value="Disponible">Disponible</option>
                <option value="Ocupada">Ocupada</option>
                <option value="Reservada">Reservada</option>
              </select>
              {errors.estado && (
                <p className="text-red-500 text-xs mt-1">{errors.estado.message}</p>
              )}
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-4 border-t justify-end">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center justify-center min-w-[120px]"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : table ? (
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