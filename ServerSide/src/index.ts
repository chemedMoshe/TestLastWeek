import exp from 'express';
import 'dotenv/config';
import { ConnectDB } from './config/connectDB';
import cors from 'cors';
import CaseRouter from './Router/casesRouter';
import OrganisationRouter from './Router/OrganisationRouter';
import { createServer } from "http";
import { Server } from "socket.io";
import { gnameBold } from './Controller/map';

const PORT = process.env.PORT || 3000;

const app = exp();

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

ConnectDB();
app.use(exp.json());
app.use(cors());

app.use('/api/analysis/', CaseRouter);

app.use("/api/relationships/",OrganisationRouter)

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import "./Socket/Socket";

