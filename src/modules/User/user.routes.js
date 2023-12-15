import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as uc from "./user.controller.js"

const router = Router()

router.post('/', expressAsyncHandler(uc.singUp))

router.post('/signIn', expressAsyncHandler(uc.signIn))

router.put('/', expressAsyncHandler(uc.updateAccount))

router.delete('/', expressAsyncHandler(uc.deleteAccount))

router.get('/:_id', expressAsyncHandler(uc.getUserData))

export default router
