// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import generateUniqueFlag from "@/utils/UniqueFlag";

const game5FlagStaticPart = "flag{dfsafewcvascd";

export default function handler(req, res) {
  const { userId } = req.query;

  const uId = atob(userId);

  if (req.method !== "HEAD") {
    return res.status(405).json({ error: "You've gotta try harder mate" });
  }

  const newFlag = generateUniqueFlag(uId);


  const flag = `${game5FlagStaticPart}${newFlag}}`;

  res.status(200).setHeader("flag", flag).json({ message: "Yes" });
}
