import express from "express"
import { createuser, getusers, updateuser, deleteuser, signin} from "../controllers/session/users";
import { addContent, updateContent, deleteContent, getContent, updateOrder} from "../controllers/content/contentmangement";
// import auth from "../middleware/auth";
const router = express.Router();



//----------user-------------
router.post("/signin", signin)
// router.post("/signout", signout)
router.get("/getusers", getusers)
router.post("/createuser", createuser)
router.post("/updateuser", updateuser)
router.post("/deleteuser", deleteuser)



//----------content-------------
router.post("/addcontent", addContent)
router.post("/updatecontent", updateContent)
router.post("/deletecontent", deleteContent)
router.post("/getcontent", getContent)
router.post("/updateorder", updateOrder)

export default router;