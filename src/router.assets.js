export default {
  routes: [
    { path: "/", pathName: "Inicio", pathIcon: "home" },
    { path: "/news", pathName: "Noticias", pathIcon: "news" },
    { path: "/about", pathName: "Nosotros", pathIcon: "" },
    { path: "/login", pathName: "Ingresar", pathIcon: "" },
    { path: "/services", pathName: "Servicios", pathIcon: "" },
    { path: "/contact", pathName: "Contacto", pathIcon: "" }
  ],
  routesLogged: {
    admin: [],
    teacher: [],
    superAdmin: [
      { path: "/", pathName: "Inicio", pathIcon: "home" },
      { path: "/users", pathName: "Usuarios", pathIcon: "user" },
      { path: "/chat", pathName: "Chat", pathIcon: "chat" }
    ],
    basic: [
      { path: "/", pathName: "Inicio", pathIcon: "home" },
      { path: "/chat", pathName: "Chat", pathIcon: "chat" },
      { path: "/news", pathName: "Noticias", pathIcon: "news" },
      { path: "/services", pathName: "Servicios", pathIcon: "" },
      { path: "/about", pathName: "Nosotros", pathIcon: "" }
    ],
    unxpected: []
  }
};
