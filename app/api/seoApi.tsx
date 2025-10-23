import axios from "axios";
import { SEOData1, BlogPost1 } from "@/app/types/seo";
import Lambda_url from "./url";

type SeoPayload = {
  type: string;
  data: SEOData1;
};
type SeoblogPayload = {
  type: string;
  data: BlogPost1;
};

export const saveSeoToLambda = async (seo: SeoPayload) => {
  try {
    console.log("%cCalling API via Axios", "color: blue; font-weight: bold;");
    console.log("Payload:", seo);

    const response = await axios.post(Lambda_url, seo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-secret-token",
      },
    });

    console.log("Response:", response.data);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Axios Error:", error.response?.data || error.message);

    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Lambda call failed",
    };
  }
};

export const getSeoFromLambda = async (json: { type: string }) => {
  try {
    console.log(
      "%cCalling POST API via Axios",
      "color: green; font-weight: bold;"
    );
    console.log("Payload:", json);

    const response = await axios.post(Lambda_url, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-secret-token",
      },
    });

    console.log("✅ Lambda Response:", response.data);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("❌ Lambda Error:", error.response?.data || error.message);

    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Lambda call failed",
    };
  }
};

export const deleteSeoFromLambda = async (json: { type: string }) => {

  try {
    console.log("%cCalling GET API via Axios");

    const response = await axios.post(Lambda_url, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-secret-token",
      },
    });

    console.log("GET Response:", response.data);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("GET Axios Error:", error.response?.data || error.message);

    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.message ||
        "GET Lambda call failed",
    };
  }
};

export const saveBlogSeoToLambda = async (seo: SeoblogPayload) => {
  try {
    const response = await axios.post(Lambda_url, seo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-secret-token",
      },
    });
    console.log("Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Axios Error:", error.response?.data || error.message);

    return {
      success: false,
      error:
        error.response?.data?.error || error.message || "Lambda call failed",
    };
  }
};
