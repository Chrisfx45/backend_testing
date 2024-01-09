import express , {json, urlencoded, Express, NextFunction, Request, Response} from "express"
import cors from "cors"
import { SampleRouter } from "./routers/sample.router";

const PORT : number = 8000;

export default  class App{
    private app : Express

    constructor(){
        this.app = express()
        this.configure()
        this.routes()
        this.handleError()
    }
    private configure() : void {
        this.app.use(cors())
        this.app.use(json())
        this.app.use(urlencoded({extended : true}))
    }
    private handleError() : void {
        this.app.use(
            (err : Error, req : Request, res : Response, next : NextFunction)=>{
                console.error( "Error : ", err.stack);
                res.status(500).send(err.message);
            }
        )
    }
    private routes() : void{
        const sampleRouter = new SampleRouter()

        this.app.use("/samples", sampleRouter.getRouter())
    }

    public start() : void{

        this.app.listen(PORT, ()=>{
            console.log("ron on port", PORT)
        })
    } 
}