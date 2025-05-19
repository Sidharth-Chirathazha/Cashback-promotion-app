import { useLoaderData, Form, useActionData } from "@remix-run/react";
import axios from "axios";


const API_URL = `${import.meta.env.VITE_API_URL}cashback/settings/`;

export async function loader(){
    try{
        const res = await axios.get(API_URL);
        return res.data.length > 0 ? res.data[0] : null;
    }catch (error) {
        console.error("Error fetching cashback settings:", error.message);
        return null;
    }
}

export async function action({ request }) {
  const formData = await request.formData();
  const body = {
    min_order_amount: parseFloat(formData.get("min_order_amount")),
    cashback_percentage: parseFloat(formData.get("cashback_percentage")),
    is_active: formData.get("is_active") === "on",
  };

  let existingSetting = null;

  try {
        const res = await axios.get(API_URL);
        console.log("Response from settings API:", res.data);
        if (res.data.length > 0) {
            existingSetting = res.data[0];
        }
    } catch (error) {
        console.error("Error fetching cashback settings in action:", error);
    }

  try {

    if (existingSetting && existingSetting.id) {
      const res = await axios.put(`${API_URL}${existingSetting.id}/`, body);
      return {success: true};
    } else {
      const res = await axios.post(API_URL, body);
      return {success: true};
    }
  } catch (error) {
    console.error("Error saving cashback settings:", error);
    return { success: false, error: "Failed to save settings" };
  }
}


export default function CashbackSettings() {
  const data = useLoaderData();
  const result = useActionData();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cashback Settings</h1>

      {result?.success && (
        <p className="text-green-600 mb-4">Settings saved successfully!</p>
      )}

      {result?.error && (
        <p className="text-red-600 mb-4">{result.error}</p>
      )}

      <Form method="post" className="space-y-4">
        <div>
          <label className="block font-medium">Minimum Order Amount ($)</label>
          <input
            name="min_order_amount"
            type="number"
            step="0.01"
            defaultValue={data?.min_order_amount || ""}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Cashback Percentage (%)</label>
          <input
            name="cashback_percentage"
            type="number"
            step="1"
            defaultValue={data?.cashback_percentage || ""}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              name="is_active"
              type="checkbox"
              defaultChecked={data?.is_active}
            />
            Enable Cashback
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </Form>
    </div>
  );
}