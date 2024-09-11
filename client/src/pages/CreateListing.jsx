import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import app from "../../firebase";

export default function CreateListing() {
  const [files, setFile] = useState([]);
  const [formData, setFormdata] = useState({
    imageUrls: [],
  });
  const [imageuploadError, setImageuplaodError] = useState(false);
  const [uploading,setUploading] = useState(false);
  console.log(formData);

  const handleChangeImage = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true)
        setImageuplaodError(false)
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormdata({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageuplaodError(false);
          setUploading(false)
        })
        .catch((err) => {
          setImageuplaodError("Image uplaod failed (2mb max per listing");
          setUploading(false)
        });
    } else {
      setImageuplaodError("You can upload only 6 images per listing");
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress} % done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            resolve(downloadurl);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index)=>{
    setFormdata({
        ...formData,
        imageUrls:formData.imageUrls.filter((_,i)=> i!== index
        )
    })
  }

  return (
    <main className="p-3 flex-1 mx-auto max-w-4xl">
      <h1 className="text-3xl text-center my-3 font-semibold">
        Create a Listning
      </h1>
      <form className="flex flex-col sm:flex-row gap-10 my-8">
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="63"
            minLength="5"
            className="p-3 rounded-lg "
            required
          />
          <textarea
            id="description"
            placeholder="Description"
            required
            className="border p-3  rounded-lg"
          ></textarea>
          <input
            type="text "
            placeholder="Address"
            className="p-3 rounded-lg"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-6">
              <input type="checkbox" id="sale" className="w-5" />
              <span>sell</span>
            </div>
            <div className="flex gap-6">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-6">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-6">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-6">
              <input type="checkbox" id="offer" className="w-5" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 my-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 border border-gray-600 rounded-lg"
                min="1"
                required
                max="10"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 border border-gray-600 rounded-lg"
                min="1"
                required
                max="10"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 border border-gray-600 rounded-lg"
                min="1"
                required
                max="10"
              />
              <div>
                <p>Regular Price</p>
                <span>($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 border border-gray-600 rounded-lg"
                min="1"
                required
                max="10"
              />
              <div>
                <p>Discounted Price</p>
                <span>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 ">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600">
              The first image will be cover (max-6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFile(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-600 rounded w-full"
            />
            <button
              type="button"
              onClick={handleChangeImage}
              className="p-3 rounded-lg border border-green-600 text-green-500"
            >
              {uploading?'Uploading...' : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageuploadError && imageuploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url,index) => (
              <div key={url} className="flex justify-between">
                <img
                  src={url}
                  alt="listing image"
                  className="w-24 h-20 object-contain rounded-lg"
                />
                <button
                onClick={()=>handleDeleteImage(index)}
                  type="button"
                  className="text-red-700 uppercase rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}

          <button className="p-3 border bg-gray-700 text-white my-3 uppercase rounded-lg">
            create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
