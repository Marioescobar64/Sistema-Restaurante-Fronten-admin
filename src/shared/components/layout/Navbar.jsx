import imgLogo from "../../../assets/img/logo.png";

export const Navbar = ({ user }) => {
    return (
        <nav className="bg-[#E8D5B7]/95 backdrop-blur-md border-b border-[#A0724A]/40 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* LOGO + NOMBRE */}
                <div className="flex items-center gap-3">
                    <img
                        src={imgLogo}
                        alt="Papa Luigi Logo"
                        className="h-9 md:h-10 w-auto object-contain"
                    />

                    <div className="flex flex-col leading-tight">
                        <span className="font-bold text-[#4A2C0A] text-lg">
                            Papa Luigi
                        </span>
                        <span className="text-xs text-[#7A5235]">
                            Panel Administrativo
                        </span>
                    </div>
                </div>

                {/* USUARIO */}
                <div className="flex items-center gap-3">

                    {/* Nombre usuario */}
                    <div className="hidden sm:flex flex-col text-right">
                        <span className="text-sm font-semibold text-[#4A2C0A]">
                            {user?.username || "Admin"}
                        </span>
                        <span className="text-xs text-[#7A5235]">
                            {user?.role || "Administrador"}
                        </span>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#A0724A]/70 bg-[#C4935A]/30">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : null}
                    </div>

                </div>
            </div>
        </nav>
    );
};