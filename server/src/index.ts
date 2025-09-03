import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import * as dynamoose from "dynamoose"
import { clerkMiddleware, createClerkClient, requireAuth } from "@clerk/express"

/** ROUTES import */
import courseRoutes from "./routes/courseRoutes"
import userClerkRoutes from "./routes/userClerkRoutes"

/** configuration */
dotenv.config()

const isProduction = process.env.NODE_ENV === "production"
if (!isProduction) {
    dynamoose.aws.ddb.local();
}

export const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
})

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware())

/** ROUTES */
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/courses", courseRoutes);
app.use("/users/clerk",requireAuth(), userClerkRoutes);

/**SERVER */
const PORT = process.env.PORT || 5000;

if (!isProduction) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
