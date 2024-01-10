import { SampleController } from "../controllers/sample.controller";
import { Router } from "express";
import { validateSampleData } from "../middlewares/sampleValidation";
import { uploader } from "../middlewares/uploader";

export class SampleRouter{
    private router :any;
    private sampleController : SampleController;

    constructor (){
        this.sampleController = new SampleController();
        this.router = Router()
        this.initializeRoutes()
    }
    private initializeRoutes() : void {
        this.router.get("/", this.sampleController.getSampleData);
        this.router.post("/",validateSampleData, this.sampleController.createSampleData);
        this.router.post("/single-upload",
        uploader("IMG", "/images").single("file"), 
        this.sampleController.addNewImage)
        this.router.post("/multi-upload",uploader("IMG", "/images").array("files", 3), this.sampleController.addNewImages)
    }
    getRouter() : Router{
        return this.router;
    }
}