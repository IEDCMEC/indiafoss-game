// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import generateUniqueFlag from "@/utils/UniqueFlag";

const game4FlagStaticPart = "flag{dfsafewcvascd";

export default function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const newFlag = generateUniqueFlag(userId);

  const flag = `${game4FlagStaticPart}${newFlag}}`;

  return res.status(200).json({ flag: flag });
}
