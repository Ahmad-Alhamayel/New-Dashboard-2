import mongoose from "mongoose";
const polarityDataSchema = new mongoose.Schema(
  {},
  { collection: "PolarityData" }
);
const PolarityData = mongoose.model("PolarityData", polarityDataSchema);

async function getData() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

  // Define schema and model for your collection

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
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
