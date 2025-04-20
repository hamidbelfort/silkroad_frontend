import axiosInstance from "../axios/axiosInstance";
interface Slider {
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
  isActive: boolean;
}
interface SliderResponse {
  success: boolean;
  message: string;
  error?: string;
}
export const createSlider = async (
  payload: Slider
): Promise<SliderResponse> => {
  try {
    const res = await axiosInstance.post<SliderResponse>(
      "/api/slider",
      payload
    );
    return res.data;
  } catch (err) {
    console.log("Failed to create slider : " + err);
    throw err;
  }
};
export const getSliders = async () => {
  try {
    const res = await axiosInstance.get("/api/slider");
    return res.data;
  } catch (err) {
    console.log("Failed to get sliders : " + err);
    throw err;
  }
};
export const deleteSlider = async (
  id: string
): Promise<SliderResponse> => {
  try {
    const res = await axiosInstance.delete<SliderResponse>(
      `/api/slider/${id}`
    );
    return res.data;
  } catch (err) {
    console.log("Failed to delete slider : " + err);
    throw err;
  }
};
export const updateSlider = async (
  id: string,
  payload: Slider
): Promise<SliderResponse> => {
  try {
    const res = await axiosInstance.put(
      `/api/slider/${id}`,
      payload
    );
    return res.data;
  } catch (err) {
    console.log("Failed to update slider : " + err);
    throw err;
  }
};
