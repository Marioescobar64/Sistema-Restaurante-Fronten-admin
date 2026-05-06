import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProductStore } from "../../users/store/productStore"; // Tu store de productos
import { Spinner } from "@material-tailwind/react";
import { useSaveProduct } from "../../administration/hooks/useSaveProduct.js"; // Tu hook de guardado adaptado
import { showSuccess, showError } from "../../../shared/utils/toast.js";

// 🔹 Definimos las categorías permitidas del restaurante para evitar errores de escritura
const CATEGORIAS_PRODUCTO = [
  "Entradas",
  "Platos Fuertes",
  "Postres",
  "Bebidas",
  "Refacciones",
  "Especialidades",
];

export const ProductModal = ({ isOpen, onClose, product }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveProduct } = useSaveProduct();
  const loading = useProductStore((state) => state.loading);

  // 🔹 Cargar datos del producto al editar (usando las propiedades en español de tu backend)
  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: product.precio,
          categoria: product.categoria,
        });
      } else {
        reset({
          nombre: "",
          descripcion: "",
          precio: "",
          categoria: "", // Queda vacío para forzar al usuario a seleccionar una opción válida
        });
      }
    }
  }, [isOpen, product, reset]);

  // 🔹 Enviar datos al Hook
  const onSubmit = async (data) => {
    try {
      // Pasamos los datos limpios al hook saveProduct
      await saveProduct(data, product?._id);

      showSuccess(
        product
          ? "Producto actualizado correctamente"
          : "Producto creado correctamente"
      );

      reset();
      onClose();
    } catch (error) {
      showError(error.message || "Error al guardar el producto");
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
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información para gestionar el menú y los productos del restaurante
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >
          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nombre (Requerido en tu esquema de Mongoose) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Nombre del Producto</label>
              <input
                type="text"
                placeholder="Ej. Pizza Margherita, Lasagna de Carne, etc."
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  maxLength: { value: 100, message: "El nombre no puede superar los 100 caracteres" }
                })}
                className="input"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
              )}
            </div>

            {/* Categoría (Ahora es un SELECT predefinido para evitar errores) */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Categoría</label>
              <select
                {...register("categoria", {
                  required: "La categoría es obligatoria",
                })}
                className="input"
              >
                <option value="" disabled>Seleccione una categoría</option>
                {CATEGORIAS_PRODUCTO.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.categoria && (
                <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>
              )}
            </div>

            {/* Precio */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Precio (Q)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ej. 45.00"
                {...register("precio", {
                  required: "El precio es obligatorio",
                  min: { value: 0, message: "El precio no puede ser menor a 0" },
                })}
                className="input"
              />
              {errors.precio && (
                <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Descripción del Producto</label>
              <textarea
                placeholder="Describe los ingredientes, tamaño o detalles del producto..."
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                })}
                className="input min-h-[80px]"
              />
              {errors.descripcion && (
                <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
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
              ) : product ? (
                "Guardar cambios"
              ) : (
                "Crear producto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};