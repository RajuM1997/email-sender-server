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

(async () => {
  const reply = await AIService.makeResponse();
  console.log(reply);
})();

export default app;
