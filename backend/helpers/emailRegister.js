import nodemailer from 'nodemailer'; 

const emailRegister=async (data)=>{
const transporter=nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    }
});

const {email,name,token}=data;
console.log(data); 

//Send email 
const info= await transporter.sendMail({
    from: "APV -Administrador de Pacientes de Veterinaria",
    to:email, 
    subject: 'Comprueba tu cuenta en APV',
    text: 'Comprueba tu cuenta en APV', 
    html: `<p> Hola: ${name}, comprueba tu cuenta en APV. </p>
           <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace :
           <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar Cuenta </a> </p>
           <p>Si no creaste esta cuenta, puedes ignorar este mensaje </p>
    
    `
  });
  console.log('Menssaje enviado: %s', info.messageId); 
}

export default emailRegister;
