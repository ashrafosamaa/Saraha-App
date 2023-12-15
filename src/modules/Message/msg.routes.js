import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as mc from "./msg.controller.js"

const router = Router()

router.post('/:sendTo', expressAsyncHandler(mc.sendMsg))

router.delete('/', expressAsyncHandler(mc.deleteMsg))

router.put('/', expressAsyncHandler(mc.markAsRead))

router.get('/', expressAsyncHandler(mc.listUserMsg))

export default router
