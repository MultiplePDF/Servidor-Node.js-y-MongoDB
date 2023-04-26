import {config} from "dotenv";

config();

export default {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/serverDB",
    PORT: process.env.PORT || 3000,
};
