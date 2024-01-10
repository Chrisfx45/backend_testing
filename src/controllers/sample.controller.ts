import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { transporter } from "../helpers/nodemailer";


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
            return res
            .status(200)
            .send(`File ${file.filename} successfully uploaded`)
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
    async sendEmail (req : Request, res : Response, next : NextFunction){
        try{
            await transporter.sendMail({
                from : "sender address",
                to: "ianpadilla23@gmail.com",
                subject : "hi",
                html :"<h1>what r u doin <h1>"
            })
            res.status(200).send("Email has been sent")
        }catch(error){
            next(error)
        }
    }
}