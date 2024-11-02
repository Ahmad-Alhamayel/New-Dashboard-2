import { waitUntil } from "@vercel/functions";

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

export function GET(request) {
  let dataToBeReturned;
  waitUntil(
    getData().then((data) => {
      dataToBeReturned = data;
      console.debug(data);
    })
  );
  if (!dataToBeReturned)
    return new Response(
      { message: "Error retrieving data", error },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  return new Response(dataToBeReturned, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
