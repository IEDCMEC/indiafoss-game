// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import generateUniqueFlag from "@/utils/UniqueFlag";

const game5FlagStaticPart = "flag{dfsafewcvascd";

export default function handler(req, res) {
  if (req.method !== "HEAD") {
    return res.status(405).json({ error: "You've gotta try harder mate" });
  }

  const cookies = req.headers.cookie;

  const cookieObj = cookies.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split("=");
    acc[name] = value;
    return acc;
  }, {});

  const userId = cookieObj["TheGameUserId"];
  const newFlag = generateUniqueFlag(userId);

  const flag = `${game5FlagStaticPart}${newFlag}}`;

  res.status(200).setHeader("flag", flag).json({ message: "Yes" });
}
