import { Router } from "express";


const router = Router();



router.get("/login", (req, res) => {
    res.send("On veut se Log ?");
});


export default router;