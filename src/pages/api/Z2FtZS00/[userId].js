import generateUniqueFlag from "@/utils/UniqueFlag";

export default function handler(req, res) {
  const game4FlagStaticPart = process.env.STATIC_FOUR;

  const { userId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const newFlag = generateUniqueFlag(userId);

  const flag = `${game4FlagStaticPart}${newFlag}}`;

  return res.status(200).json({ flag: flag });
}
