import cors from "cors";
import express, { Application, Request, Response } from "express";
import { AIService } from "./utils/AIResponse";
const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://joinup-event.vercel.app"],
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "event server..",
  });
});
/**
 * git branch -M main
git remote add origin git@github.com:RajuM1997/email-sender-server.git
git push -u origin main
 * 
 */
(async () => {
  const reply = await AIService.makeResponse(
    1,
    "I came across your website and I'm interested in your services. Can you please share your pricing details? Also, do you offer any custom packages?",
  );
  console.log(reply);
})();

export default app;
