import axiosInstance from "../axios/axiosInstance";
interface Slider {
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
  isActive: boolean;
}
export const createSlider = async (payload: Slider) => {
  try {
    const res = await axiosInstance.post("/api/slider", payload);
    return res.data;
  } catch (err) {
    console.log("Failed to create slider : " + err);
  }
};
export const getSliders = async () => {
  try {
    const res = await axiosInstance.get("/api/slider");
    return res.data;
  } catch (err) {
    console.log("Failed to get sliders : " + err);
  }
};
export const deleteSlider = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/api/slider/${id}`);
    return res.data;
  } catch (err) {
    console.log("Failed to delete slider : " + err);
  }
};
export const updateSlider = async (id: string, payload: Slider) => {
  try {
    const res = await axiosInstance.put(`/api/slider/${id}`, payload);
    return res.data;
  } catch (err) {
    console.log("Failed to update slider : " + err);
  }
};
