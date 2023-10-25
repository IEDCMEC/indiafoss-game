// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import generateUniqueFlag from "@/utils/UniqueFlag";

const game4FlagStaticPart = "flag{dfsafewcvascd";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookies = req.headers.cookie;

  const cookieObj = cookies.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split("=");
    acc[name] = value;
    return acc;
  }, {});

  const userId = cookieObj["TheGameUserID"];
  const newFlag = generateUniqueFlag(userId);

  const flag = `${game4FlagStaticPart}${newFlag}}`;

  return res.status(200).json({ flag: flag });
}
