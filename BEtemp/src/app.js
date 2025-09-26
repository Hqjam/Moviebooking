import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { clerkMiddleware } from '@clerk/express'

import { serve } from "inngest/express";
import { inngest, functions } from './util/ingest.js';
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json(
  {
    limit: '50mb'
  }
));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(clerkMiddleware())
app.use("/api/inngest", serve({ client: inngest, functions }));









export default app;