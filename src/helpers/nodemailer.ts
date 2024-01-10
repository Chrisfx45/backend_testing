import nodemailer from "nodemailer"

export const  transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user :"christopher.fx45@gmail.com",
        pass : "vgnd neqo exmt bbmb"
    },

})