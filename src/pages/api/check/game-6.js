import generateUniqueFlag from "@/utils/UniqueFlag";
import { supabaseClient } from "@/utils/supabase";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const game6FlagStaticPart = process.env.NEXT_PUBLIC_STATIC_SIX;

    const token = req.body.authToken;
    const flag = req.body.flag;
    const timeTaken = req.body.timeTaken;

    const email = await jwt.verify(token, process.env.SECRET);

    const { data: userId } = await supabaseClient
      .from("players")
      .select("id,score")
      .eq("email", email);

    const newFlag = generateUniqueFlag(userId[0].id);

    const expectedFlag = `${game6FlagStaticPart}${newFlag}}`;

    if (flag != `${expectedFlag}`) {
      return res.status(204).json({
        error: "Wrong Flag !",
      });
    }

    const { error } = await supabaseClient
      .from("players")
      .update({ score: userId[0].score + 1, time_taken: timeTaken })
      .eq("id", userId[0].id);

    if (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }

    return res.status(200).json({
      message: "Success",
    });
  }
}
