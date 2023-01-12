const uploadToCloudinary = async (image: File) => {
  const data = new FormData();
  data.append('file', image as File);
  data.append('cloud_name', 'eleni');
  data.append('upload_preset', 'yuf8gy6c');
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/eleni/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );
  const file = await response.json();
  const newUrl: string = file.secure_url;
  return newUrl;
};

export default uploadToCloudinary;
