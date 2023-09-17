import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  function handleUpload() {
    if (!file) {
      setMessage('No file selected');
      return;
    }

    setMessage('Uploading...');

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Data = reader.result.split(',')[1]; // Extract the base64 data portion
      // Now, you can send `base64Data` to your server or use it as needed
      // For example, you can include it in your Axios request
      try {
        const response = await axios.post('YOUR_UPLOAD_URL_HERE', { data: base64Data });
        if (response.status === 200) {
          setMessage('Upload Successfully');
        } else {
          setMessage('Upload failed');
        }
      } catch (error) {
        console.error(error);
        setMessage('Upload failed');
      }
    };

    reader.onerror = (error) => {
      console.error(error);
      setMessage('An error occurred while reading the file.');
    };

    reader.readAsDataURL(file);
  }

  // async function reduce_image_file_size(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
//     let resized_base64 = await new Promise((resolve) => {
//         let img = new Image()
//         img.src = base64Str
//         img.onload = () => {
//             let canvas = document.createElement('canvas')
//             let width = img.width
//             let height = img.height

//             if (width > height) {
//                 if (width > MAX_WIDTH) {
//                     height *= MAX_WIDTH / width
//                     width = MAX_WIDTH
//                 }
//             } else {
//                 if (height > MAX_HEIGHT) {
//                     width *= MAX_HEIGHT / height
//                     height = MAX_HEIGHT
//                 }
//             }
//             canvas.width = width
//             canvas.height = height
//             let ctx = canvas.getContext('2d')
//             ctx.drawImage(img, 0, 0, width, height)
//             resolve(canvas.toDataURL()) // this will return base64 image results after resize
//         }
//     });
//     return resized_base64;
// }


// async function process_image(file, min_image_size = 300) {
//     const res = await image_to_base64(file);
//     if (res) {
//         const old_size = calc_image_size(res);
//         if (old_size > min_image_size) {
//             const resized = await reduce_image_file_size(res);
//             const new_size = calc_image_size(resized)
//             console.log('new_size=> ', new_size, 'KB');
//             console.log('old_size=> ', old_size, 'KB');
//             return resized;
//         } else {
//             console.log('image already small enough')
//             return res;
//         }

//     } else {
//         console.log('return err')
//         return null;
//     }
// }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={handleUpload}>Upload</button>

      {message && <span>{message}</span>}
    </div>
  );
}

export default ImageUpload;
