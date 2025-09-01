import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import * as dynamoose from "dynamoose"

/** ROUTES import */

/** configuration */
dotenv.config()

const isProduction = process.env.NODE_ENV === "production"
if (!isProduction) {
    dynamoose.aws.ddb.local();
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/** ROUTES */
app.get("/", (req, res) => {
    res.send("Hello World!");
});

/**SERVER */
const PORT = process.env.PORT || 5000;

if (!isProduction) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
