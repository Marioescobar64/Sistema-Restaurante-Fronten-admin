import imgLogo from "../../../assets/img/logo.png";
import { AvatarUser } from "../../ui/AvatarUser";

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo + título */}
                <div className="flex items-center gap-2">
                    <img
                        src={imgLogo}
                        alt="Papas luigi logo"
                        className="h-8 md:h-10 w-auto object-contain"
                    />

                    <h1 className="font-bold text-main-blue text-lg">
                        Papas luigi admin
                    </h1>
                </div>

                {/* Avatar placeholder */}
                <AvatarUser />
            </div>
        </nav>
    );
};