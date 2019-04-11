import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
   let account = await nodemailer.createTestAccount();

   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: account.user, // generated ethereal user
         pass: account.pass // generated ethereal password
      }
   });

   // setup email data with unicode symbols
   const mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Email Confiramtion ✔", // Subject line
      text: "Verify your email ?", // plain text body
      html: `<a href="${url}">${url}</a>` // html body
   };

   // send mail with defined transport object
   const info = await transporter.sendMail(mailOptions);

   console.log("Message sent: %s", info.messageId);
   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
