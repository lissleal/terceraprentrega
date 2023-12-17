import express from "express";
import authorizeRole from "../config/auth.config.js";


const ViewsRouter = express.Router()

//Rutas GET para la página de inicio y detalles del producto:
//deberia agregar las otras vistas aca?

ViewsRouter.get("/inicio", async (req, res) => {
    res.render("inicio", {
        title: "App de compras",
    })
})
ViewsRouter.get("/register", (req, res) => {
    res.render("register", {
        title: "Registro de Usuario"
    })
})

ViewsRouter.get("/login", (req, res) => {
    res.render("login", {
        title: "Login de Usuario"
    })
})

ViewsRouter.get("/addProducts", authorizeRole("admin"), (req, res) => {
    res.render("addProducts", {
        title: "Agregar Productos"
    })
})

export default ViewsRouter