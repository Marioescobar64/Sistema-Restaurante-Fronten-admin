import imgLogo from "../../../assets/img/logo.png";
import { getRoleLabel } from "../../../shared/utils/rolePermissions";

export const Navbar = ({ user }) => {
  const username = user?.username || localStorage.getItem("userName") || "Admin";
  const roleLabel = getRoleLabel(user?.role || localStorage.getItem("userRole") || "");

  return (
    <nav className="bg-[#C00000]/95 backdrop-blur-md border-b border-[#8B0000]/40 sticky top-0 z-50 shadow-sm w-full">
      <div className="flex items-center justify-between h-16 w-full max-w-full px-3 sm:px-4 relative box-border">

        {/* LOGO a la izquierda */}
        <div className="flex items-center gap-2 sm:gap-3 z-10 flex-shrink-0">
          <img
            src={imgLogo}
            alt="Papa Luigi Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-white text-base sm:text-lg">
              Papa Luigi
            </span>
            <span className="text-[10px] sm:text-xs text-white/80">
              Panel Administrativo
            </span>
          </div>
        </div>

        {/* TEXTO CENTRAL (Optimizado para ocultarse en móviles y evitar colisiones) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-center w-auto max-w-[40%]">
          <span className="text-white font-bold text-base lg:text-xl truncate block">
            Bienvenido, {username} a Papa Luigi
          </span>
        </div>

        {/* USUARIO a la derecha */}
        <div className="flex items-center gap-2 sm:gap-3 z-10 flex-shrink-0">
          {/* Nombre usuario - Se muestra en dispositivos pequeños pero adaptado, se oculta solo el rol */}
          <div className="flex flex-col text-right">
            <span className="text-xs sm:text-sm font-semibold text-white max-w-[80px] sm:max-w-[150px] truncate block">
              {username}
            </span>
            <span className="hidden sm:inline text-[10px] text-white/80">
              {roleLabel}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white/70 bg-[#2E7D32]/30 flex items-center justify-center flex-shrink-0">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-sm uppercase">
                {username.charAt(0)}
              </span>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};