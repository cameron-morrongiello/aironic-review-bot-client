import { DB } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    // Validate the input as a valid Amazon product link string
    const amazonProductLinkRegex = /^https?:\/\/(www\.)?amazon\.com\/.*$/;
    if (!amazonProductLinkRegex.test(input)) {
      return res.status(400).json({ error: "Invalid Amazon product link" });
    }

    try {
      // Save the input to Firestore database
      await addDoc(collection(DB, "productLinks"), {
        productLink: input,
        store: "Amzaon",
      });
      return res.status(200).json({
        message: `Product link saved successfully`,
      });
    } catch (error) {
      console.error("Error saving product link to Firestore:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
