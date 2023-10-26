import { supabaseClient } from "@/utils/supabase";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = req.body.authToken;
    const score = req.body.score;
    const flag = req.body.flag;
    const timeTaken = req.body.timeTaken;
    const email = await jwt.verify(token, process.env.SECRET);
    const expectedFlagData = await fetch(gameAPI, {
      method: "HEAD",
    });

    const expectedFlag = expectedFlagData.headers.get("flag");

    if (flag != `${expectedFlag}`) {
      return res.status(500).json({
        error: "wrong flag!",
      });
    }
    const { data: userId } = await supabaseClient
      .from("players")
      .select("id")
      .eq("email", email);

    const { data, error } = await supabaseClient
      .from("players")
      .update({ score: score, time_taken: timeTaken })
      .eq("id", userId[0].id);

    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
    return res.status(200).json({
      message: "Success",
    });
  }
}
