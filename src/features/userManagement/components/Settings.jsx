export const Settings = () => {
  const users = [
    {
      id: "1",
      username: "juanp",
      email: "juan@example.com",
      role: "ADMIN",
      profilePicture: "https://via.placeholder.com/100",
      isCurrentUser: false,
    },
    {
      id: "2",
      username: "maria",
      email: "maria@example.com",
      role: "STAFF",
      profilePicture: "https://via.placeholder.com/100",
      isCurrentUser: true,
    },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-semibold text-[#4A2C0A] mb-6">
        Gestión de Personal
      </h1>

      <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-lg 
                      border border-[#A0724A]/20 overflow-hidden">

        {/* TABLE (desktop) */}
        <div className="hidden md:block">
          <table className="w-full text-sm">

            <thead className="bg-[#E8D5B7] text-[#4A2C0A]/70 uppercase text-xs">
              <tr>
                <th className="text-left px-6 py-4">Empleado</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Rol</th>
                <th className="text-right px-6 py-4">Acción</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#A0724A]/20 hover:bg-[#E8D5B7]/40 transition"
                >

                  {/* Usuario */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-11 h-11 rounded-full object-cover border border-[#A0724A]/30"
                      />
                      <div>
                        <p className="font-semibold text-[#4A2C0A]">
                          {user.username}
                        </p>
                        <p className="text-xs text-[#4A2C0A]/50">
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-[#4A2C0A]/70">
                    {user.email}
                  </td>

                  {/* Rol */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        user.role === "ADMIN"
                          ? "bg-[#7F3C09] text-[#F5ECD9]"
                          : "bg-[#E8D5B7] text-[#4A2C0A]"
                      }`}
                    >
                      {user.role === "ADMIN" ? "Administrador" : "Personal"}
                    </span>
                  </td>

                  {/* Acción */}
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={user.isCurrentUser}
                      className={`px-4 py-2 rounded-lg text-xs font-medium ${
                        user.isCurrentUser
                          ? "bg-[#E8D5B7] text-[#4A2C0A] cursor-not-allowed"
                          : "bg-[#A0724A] text-[#F5ECD9] hover:bg-[#7A5235]"
                      }`}
                    >
                      {user.isCurrentUser
                        ? "No permitido"
                        : user.role === "ADMIN"
                        ? "Hacer Personal"
                        : "Hacer Admin"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* CARDS (mobile) */}
        <div className="md:hidden divide-y divide-[#A0724A]/20">
          {users.map((user) => (
            <div key={user.id} className="p-4 flex flex-col gap-3">

              <div className="flex items-center gap-3">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover border border-[#A0724A]/30"
                />
                <div>
                  <p className="font-semibold text-[#4A2C0A]">
                    {user.username}
                  </p>
                  <p className="text-xs text-[#4A2C0A]/50">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    user.role === "ADMIN"
                      ? "bg-[#7F3C09] text-[#F5ECD9]"
                      : "bg-[#E8D5B7] text-[#4A2C0A]"
                  }`}
                >
                  {user.role === "ADMIN" ? "Administrador" : "Personal"}
                </span>

                <button
                  disabled={user.isCurrentUser}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    user.isCurrentUser
                      ? "bg-[#E8D5B7] text-[#4A2C0A]"
                      : "bg-[#A0724A] text-[#F5ECD9]"
                  }`}
                >
                  {user.role === "ADMIN" ? "Personal" : "Admin"}
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};