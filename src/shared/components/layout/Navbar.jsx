import imgLogo from "../../../assets/img/logo.png";

export const Navbar = ({ user }) => {
    const username = user?.username || "Admin";

    return (
        <nav className="bg-[#C00000]/95 backdrop-blur-md border-b border-[#8B0000]/40 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center justify-between h-16 w-full relative">

                {/* LOGO a la izquierda */}
                <div className="flex items-center gap-3 pl-4">
                    <img
                        src={imgLogo}
                        alt="Papa Luigi Logo"
                        className="h-10 w-auto object-contain"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="font-bold text-white text-lg">
                            Papa Luigi
                        </span>
                        <span className="text-xs text-white/80">
                            Panel Administrativo
                        </span>
                    </div>
                </div>

                {/* TEXTO CENTRAL */}
                <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                    <span className="text-white font-bold text-lg md:text-xl">
                        Bienvenido, {username} a Papa Luigi
                    </span>
                </div>

                {/* USUARIO a la derecha */}
                <div className="flex items-center gap-3 pr-4">
                    {/* Nombre usuario */}
                    <div className="hidden sm:flex flex-col text-right">
                        <span className="text-sm font-semibold text-white">
                            {user?.username || "Admin"}
                        </span>
                        <span className="text-xs text-white/80">
                            {user?.role || "Administrador"}
                        </span>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/70 bg-[#2E7D32]/30 flex items-center justify-center">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-white font-bold text-sm">
                                {username.charAt(0)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};