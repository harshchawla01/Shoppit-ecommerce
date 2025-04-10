// export const uploadToCloudinary = async (pics:any) => {

//     // const cloud_name="dxoqwusir"
//     const cloud_name="dkcodj8tv";
//     const upload_preset="ml_default"
    
//     if (pics) {
      
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", upload_preset);
//       data.append("cloud_name", cloud_name);
  
//       const res = await 
//       fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//         method: "POST",
//         body: data,
//       })
        
//         const fileData=await res.json();
//         console.log("url : ", fileData);
//         return fileData.url;
  
//     } else {
//       console.log("error");
//     }
//   };


export const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dkcodj8tv";
  const upload_preset = "ml_default";

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    // Remove: data.append("cloud_name", cloud_name);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: data,
      });

      const fileData = await res.json();

      if (res.ok) {
        console.log("url:", fileData.url);
        return fileData.url;
      } else {
        console.error("Upload failed:", fileData);
        return null;
      }

    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return null;
    }

  } else {
    console.error("No file provided");
    return null;
  }
};
