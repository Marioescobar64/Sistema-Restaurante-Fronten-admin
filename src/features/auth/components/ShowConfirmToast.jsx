import toast from "react-hot-toast";

export function ShowConfirmToast({ title, message, onConfirm }) {
  toast.custom((t) => (
    /* CAMBIO RESPONSIVO: Se cambió 'w-96' por 'w-full max-w-[340px] mx-4 box-border' para un ajuste perfecto en móviles */
    <div className="bg-[#F5ECD9]/95 backdrop-blur-md p-6 rounded-2xl w-full max-w-[340px] mx-4 text-center shadow-xl border border-[#A0724A]/20 box-border">

      <h2 className="text-lg font-semibold text-[#4A2C0A] mb-2">
        {title}
      </h2>

      {/* CAMBIO RESPONSIVO: Ajuste sutil de tamaño de fuente en pantallas muy pequeñas */}
      <p className="text-xs sm:text-sm text-[#4A2C0A]/80 mb-4">
        {message}
      </p>

      <div className="flex justify-center gap-4 mt-4">

        {/* CANCELAR */}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-5 py-2 rounded-lg bg-[#E8D5B7] text-[#4A2C0A] font-medium 
                     hover:bg-[#d9c4a3] transition-all duration-300 text-sm sm:text-base"
        >
          Cancelar
        </button>

        {/* CONFIRMAR */}
        <button
          onClick={() => {
            onConfirm?.();
            toast.dismiss(t.id);
          }}
          className="px-5 py-2 rounded-lg bg-[#7F3C09] text-[#F5ECD9] font-semibold 
                     hover:bg-[#2C1506] transition-all duration-300 shadow-md text-sm sm:text-base"
        >
          Confirmar
        </button>

      </div>
    </div>
  ));
}