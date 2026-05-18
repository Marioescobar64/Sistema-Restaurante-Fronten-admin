import { toast } from "react-hot-toast";
import { React } from "react";
 
export function showConfirmToast({title, message, onConfirm}){
 
    toast.custom((t) => (
        /* CAMBIO RESPONSIVO: Se cambió 'w-96' por 'w-full max-w-md mx-4' para que se adapte perfectamente a celulares */
        <div className="bg-white p-6 rounded-xl w-full max-w-md mx-4 text-center shadow-lg border border-gray-200 box-border">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="mb-4 text-sm sm:text-base">{message}</p>
            
            {/* Contenedor de botones flexible */}
            <div className="flex justify-center gap-4 mt-4">
 
            <button
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
                onClick={()=>toast.dismiss(t.id)}
            >
                Cancelar
            </button>
 
            <button
                onClick={()=> {
                    onConfirm?.();
                    toast.dismiss(t.id);
                }}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
                Confirmar
            </button>
            
            </div>
        </div>
    ));
 
}