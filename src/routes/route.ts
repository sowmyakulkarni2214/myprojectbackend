import express from "express"
import { createuser, getusers, updateuser, deleteuser} from "../controllers/session/users";
import { addContent, updateContent, deleteContent, getContent, updateOrder} from "../controllers/content/contentmangement";
const router = express.Router();



//----------user-------------
router.get("/getusers", getusers)
router.post("/createuser", createuser)
router.post("/updateuser", updateuser)
router.post("/deleteuser", deleteuser)
router.post("/signin", signin)

//----------content-------------
router.post("/addcontent", addContent)
router.post("/updatecontent", updateContent)
router.post("/deletecontent", deleteContent)
router.post("/getcontent", getContent)
router.post("/updateorder", updateOrder)

export default router;