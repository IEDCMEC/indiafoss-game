import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
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
      <p>
        We appreciate your participation in the previous test and would like to
        invite you to the Hard Level Test.
      </p>
      <p>
        You can access it through this link:
        <a href="https://game.iedcmec.in/level2">Click Here</a>
      </p>
      <p>The test is available until 29th October, 12 p.m.</p>
      <p>
        Please feel free to contact our support team at
        <a href="mailto:iedcmec@mec.ac.in">iedcmec@mec.ac.in</a> if you have any
        questions or encounter issues.
      </p>
      <p>Thank you for your participation, and good luck!</p>
      <br />
      <p>Best regards,</p>
      <div
        style="
          height: 20px;
          width: 85px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <img
          height="100px"
          src="https://avatars.githubusercontent.com/u/60802781?s=400&u=8695e97712e3738590b0749da3bf61a4a99b6eb7"
        />
      </div>
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

    const server = await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (success) {
          resolve(success);
        }
        reject(error);
      });
    });
    if (!server) {
      res.status(500).json({ error: "Error failed" });
    }

    const success = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions).then((info, err) => {
        if (info.response.includes("250")) {
          resolve(true);
        }
        reject(err);
      });
    });

    if (!success) {
      res.status(500).json({ error: "Error sending email" });
    }
    res.status(200).json({ success: success });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
