import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import uploadDownload from "../middleware/uploadDownload";

const router = Router()

router.get('/',indexCtrl.employeeCtrl.findAll)
router.get("/images/:filename",uploadDownload.showProfile)
router.post('/',uploadDownload.uploadFiles,indexCtrl.employeeCtrl.createEmp)
router.put('/:id',uploadDownload.uploadFiles,indexCtrl.employeeCtrl.updateEmp)
export default router