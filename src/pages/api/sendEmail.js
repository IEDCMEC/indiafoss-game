import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { toEmail, secret } = req.body;

  const expectedSecret = process.env.NEXT_PUBLIC_MAIL_SECRET;

  const decodedSecret = Buffer.from(secret, "base64").toString("ascii");

  if (decodedSecret !== expectedSecret) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const mailHtml = `
    <html>
    <body>
    <p>Heyy Participant,</p>
    <p>I appreciate your participation in the previous test and would like to invite you to the Hard Level Test.</p>
    <p>You can access it through this link: <a href="https://game.iedcmec.in/level2">Click Here</a></p>
    <p>The test is available until 29th October, 12 p.m.</p>
    <p>Please feel free to contact our support team at <a href="mailto:iedcmec@mec.ac.in">iedcmec@mec.ac.in</a> if you have any questions or encounter issues.</p>
    <p>Thank you for your participation, and good luck!</p>
    <br/>
    <p>Best regards,</p>
    <p><b>IEDC MEC</b></p>
    </body>
    </html>
  `;

  const subject = "Invitation to Take the Hard Level Test | IEDC MEC";

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: mailHtml,
  };

  const { error, info } = await transporter.sendMail(mailOptions);
  if (error) {
    res.status(500).json({ message: "Error sending email" });
  } else {
    res.status(200).json({ message: "Email sent successfully" });
  }
}
