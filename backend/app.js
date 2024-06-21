import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js";
import vaultRoutes from "./routes/vault.routes.js";
import dataRoutes from "./routes/data.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vaults", vaultRoutes);
app.use("/api/v1/datas", dataRoutes);

export { app }