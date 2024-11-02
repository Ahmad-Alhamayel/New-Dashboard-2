import { waitUntil } from "@vercel/functions";
import mongoose from "mongoose";

async function getData() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  // Define schema and model for your collection
  const polarityDataSchema = new mongoose.Schema(
    {},
    { collection: "PolarityData" }
  );
  const PolarityData = mongoose.model("PolarityData", polarityDataSchema);

  try {
    const data = await PolarityData.find({});
    return data;
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  const data = await getData();
  console.debug(data);
  if (!data)
    return new Response(`{ message: "Error retrieving data" }`, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
