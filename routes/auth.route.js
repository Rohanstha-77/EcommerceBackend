import express from "express"
import {logIn, logOut, register} from "../controller/auth.controller.js"

const router = express.Router()


router.post("/register", register)
router.post("/login", logIn)
router.post("/logout", logOut)


export default router //export the default Router object instance of file route