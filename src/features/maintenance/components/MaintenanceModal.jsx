import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMaintenanceStore } from "../../users/store/adminStore";
import { Spinner } from "@material-tailwind/react";
import { useSaveMaintenance } from "../../administration/hooks/useSaveMaintenance";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  return `https://res.cloudinary.com/dog2q2ise/image/upload/${photo}`;
};

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

  useEffect(() => {
    if (!isOpen) return;

    if (maintenance) {
      reset({
        tableNumber: maintenance.tableNumber,
        capacity: maintenance.capacity,
        location: maintenance.location,
        status: maintenance.status,
      });

      setPreview(getPhotoUrl(maintenance.photo));

    } else {
      reset({
        tableNumber: "",
        capacity: "",
        location: "Salón Principal",
        status: "Disponible",
        photo: null,
      });
      setPreview(null);
    }
  }, [isOpen, maintenance, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "photo" && value.photo?.length > 0) {
        setPreview(URL.createObjectURL(value.photo[0]));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      await saveMaintenance(data, maintenance?._id);

      showSuccess(
        maintenance
          ? "Mesa actualizada correctamente"
          : "Mesa creada correctamente"
      );

      reset();
      setPreview(null);
      onClose();
    } catch {
      showError("Error al guardar mesa");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 p-4"
      style={{
        background: "rgba(15, 15, 15, 0.55)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
          animation: "fadeIn .2s ease-out",
        }}
      >
        {/* ANIMACIÓN */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
          }

          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

          .rm-label {
            font-size: 11px;
            font-weight: 500;
            letter-spacing: .06em;
            color: #7F1D1D;
            text-transform: uppercase;
            margin-bottom: 5px;
            display: block;
          }

          .rm-input {
            width: 100%;
            padding: 9px 12px;
            background: #FDF8F3;
            border: 0.5px solid rgba(127,29,29,0.25);
            border-radius: 9px;
            font-size: 14px;
            color: #2C1810;
            font-family: 'DM Sans', sans-serif;
            outline: none;
            transition: border-color .15s, box-shadow .15s;
          }

          .rm-input:focus {
            border-color: #EF4444;
            box-shadow: 0 0 0 3px rgba(239,68,68,.15);
          }

          .rm-error {
            color: #B91C1C;
            font-size: 11px;
            margin-top: 3px;
          }
        `}</style>

        {/* HEADER */}
        <div
          className="p-6"
          style={{
            background: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.18)",
              }}
            >
              <span style={{ fontSize: 20 }}>🪑</span>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {maintenance ? "Editar Mesa" : "Nueva Mesa"}
              </h2>

              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Completa la información de la mesa
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* PREVIEW */}
          <div className="flex justify-center">
            <div
              className="flex flex-col items-center justify-center overflow-hidden"
              style={{
                width: 110,
                height: 110,
                borderRadius: 14,
                background: "#F5EDE0",
                border: "1.5px dashed rgba(239,68,68,0.45)",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
              ) : (
                <>
                  <span style={{ fontSize: 26, marginBottom: 4 }}>📷</span>
                  <span style={{ fontSize: 11, color: "#7F1D1D" }}>
                    Sin imagen
                  </span>
                </>
              )}
            </div>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="rm-label">★ Número de mesa</label>
              <input
                type="number"
                {...register("tableNumber", { required: "Obligatorio" })}
                className="rm-input"
              />
              {errors.tableNumber && (
                <p className="rm-error">{errors.tableNumber.message}</p>
              )}
            </div>

            <div>
              <label className="rm-label">★ Capacidad</label>
              <input
                type="number"
                {...register("capacity", { required: "Obligatorio" })}
                className="rm-input"
              />
              {errors.capacity && (
                <p className="rm-error">{errors.capacity.message}</p>
              )}
            </div>

            <div>
              <label className="rm-label">⊙ Ubicación</label>
              <select {...register("location")} className="rm-input">
                <option>Salón Principal</option>
                <option>Terraza</option>
                <option>Área VIP</option>
                <option>Jardín</option>
                <option>Interior</option>
              </select>
            </div>

            <div>
              <label className="rm-label">⊙ Estado</label>
              <select {...register("status")} className="rm-input">
                <option>Disponible</option>
                <option>Ocupada</option>
                <option>Reservada</option>
                <option>Mantenimiento</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="rm-label">⊕ Imagen</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="rm-input"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div
            className="flex justify-end gap-3 pt-4"
            style={{ borderTop: "0.5px solid rgba(127,29,29,0.15)" }}
          >
            <button
              type="button"
              onClick={() => {
                reset();
                setPreview(null);
                onClose();
              }}
              style={{
                padding: "9px 20px",
                background: "transparent",
                border: "0.5px solid rgba(127,29,29,0.3)",
                borderRadius: 10,
                fontSize: 13,
                color: "#7F1D1D",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={{
                padding: "9px 22px",
                background:
                  "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : maintenance ? (
                <>✓ Guardar cambios</>
              ) : (
                <>✓ Crear mesa</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};