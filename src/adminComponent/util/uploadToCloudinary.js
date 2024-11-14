const upload_preset = "restaurant-food"; 
const cloud_name = "dtnq8hr9e";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    const res = await fetch(api_url, {
        method: "POST",
        body: data
    });

    const fileData = await res.json();
    console.log(fileData);

    return fileData.url;
};