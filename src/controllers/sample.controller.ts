import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";


export class SampleController{
    async getSampleData(req : Request, res : Response, next : NextFunction){
        try{
            const sampleData = await prisma.sample.findMany()
            return res.status(200).send(sampleData)
        }
        catch (error){
            next(error)
        }
        
    }
    async createSampleData(req : Request, res : Response, next : NextFunction){
        try{
            const {name, code} = req.body;
            const newSampleData = await prisma.sample.create({
                data : {name, code},
            })
            return res.status(201).send(newSampleData)
        }
        catch (error){
            next(error)
        }
        
    }
    async addNewImage (req : Request, res : Response, next : NextFunction){
        try{
            const {file} =req;
            if(!file) throw new Error("No File Uploaded");
            

            return res.status(200).send(`File ${file.filename} successfully uploaded`)

        }catch(error){
            next(error)
        }
    }
    async addNewImages (req : Request, res : Response, next : NextFunction){
        try{
            const {files} =req;
            if(!files?.length) throw new Error("No File Uploaded");

            return res.status(200).send(`Files successfully uploaded`)

        }catch(error){
            next(error)
        }
    }
}