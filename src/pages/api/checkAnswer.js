import { supabaseClient } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const questionId = req.body.questionId;
    const answer = req.body.answer;

    const { data: question, error: questionError } = await supabaseClient
      .from("questions")
      .select("answer,mark")
      .eq("id", questionId);

    if (questionError) {
      return res.status(400).json({
        error: questionError.message,
      });
    }

    if (question[0].answer === answer) {
      const { data: userDetails, error: userDetailsError } =
        await supabaseClient
          .from("players")
          .select("score")
          .eq("email", req.body.email);

      if (userDetailsError) {
        return res.status(400).json({
          error: userDetailsError.message,
        });
      }

      const newScore = userDetails[0].score + question[0].mark;

      const { data, error } = await supabaseClient
        .from("players")
        .update({ score: newScore })
        .eq("email", req.body.email);

      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(200).json({
        data: newScore,
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}
