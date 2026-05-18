import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTableStore } from "../../users/store/mesaStore";
import { Spinner } from "@material-tailwind/react";
import { useSaveTable } from "../../administration/hooks/useSaveMesa.js";
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

  // 🔹 Cargar datos de la mesa al editar
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
      {/* REGLAS RESPONSIVAS PARA DISPOSITIVOS MÓVILES */}
      <style>{`
        .table-modal-input {
          width: 100%;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s;
        }
        .table-modal-input:focus {
          border-color: transparent;
          box-shadow: 0 0 0 2px #3b82f6;
        }
        @media (max-width: 640px) {
          .table-modal-body {
            max-height: calc(85vh - 120px) !important;
          }
          .table-grid-inputs {
            grid-template-columns: 1fr !important;
          }
          .table-buttons-footer {
            flex-direction: column-reverse !important;
            gap: 0.5rem !important;
          }
          .table-buttons-footer button {
            width: 100% !important;
            justify-content: center;
            padding: 12px !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10 flex-shrink-0"
          style={{
            background:
              "linear-gradient(90deg, var(--main-blue, #1d4ed8) 0%, #1956a3 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold m-0">
            {table ? "Editar Mesa" : "Nueva Mesa"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 mt-1 mb-0">
            Completa la información para gestionar las mesas del restaurante
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto table-modal-body flex-grow"
        >
          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 table-grid-inputs">

            {/* Descripción */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold mb-1">Descripción de la Mesa</label>
              <input
                type="text"
                placeholder="Ej. Mesa junto a la ventana, Mesa familiar terraza, etc."
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                })}
                className="table-modal-input"
              />
              {errors.descripcion && (
                <p className="text-red-500 text-xs mt-1 mb-0">{errors.descripcion.message}</p>
              )}
            </div>

            {/* Número de Mesa */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Número de Mesa</label>
              <input
                type="number"
                placeholder="Ej. 1"
                {...register("numeroMesa", {
                  required: "El número es obligatorio",
                  min: { value: 1, message: "El número de mesa debe ser al menos 1" },
                })}
                className="table-modal-input"
              />
              {errors.numeroMesa && (
                <p className="text-red-500 text-xs mt-1 mb-0">{errors.numeroMesa.message}</p>
              )}
            </div>

            {/* Capacidad */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Capacidad (Personas)</label>
              <input
                type="number"
                placeholder="Ej. 4"
                {...register("capacidad", {
                  required: "La capacidad es obligatoria",
                  min: { value: 1, message: "La capacidad mínima debe ser de 1 persona" },
                  validate: (value) =>
                    Number.isInteger(Number(value)) || "Debe ser un número entero",
                })}
                className="table-modal-input"
              />
              {errors.capacidad && (
                <p className="text-red-500 text-xs mt-1 mb-0">{errors.capacidad.message}</p>
              )}
            </div>

            {/* Estado */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold mb-1">Estado de la Mesa</label>
              <select
                {...register("estado", {
                  required: "El estado es obligatorio",
                })}
                className="table-modal-input bg-white"
              >
                <option value="Disponible">Disponible</option>
                <option value="Ocupada">Ocupada</option>
                <option value="Reservada">Reservada</option>
              </select>
              {errors.estado && (
                <p className="text-red-500 text-xs mt-1 mb-0">{errors.estado.message}</p>
              )}
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-4 border-t justify-end table-buttons-footer flex-shrink-0">
            <button
              type="button"
              style={{ cursor: "pointer" }}
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center min-w-[120px] font-medium"
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