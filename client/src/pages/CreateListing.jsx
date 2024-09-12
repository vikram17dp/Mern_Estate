import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import app from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFile] = useState([]);
  const [formData, setFormdata] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: "1",
    bathrooms: "1",
    regularPrice: "50",
    discountPrice: "0",
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageuploadError, setImageuplaodError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log(formData);

  const handleChangeImage = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageuplaodError(false);
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
          setUploading(false);
        })
        .catch((err) => {
          setImageuplaodError("Image upload failed (2MB max per listing)");
          setUploading(false);
        });
    } else {
      setImageuplaodError("You can upload only 6 images per listing");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
         return setError("You must upload at least one image");
      
      }
      if (+formData.regularPrice < +formData.discountPrice){

          setError("Discount price must be lower than the regular price ");
          return
      }
      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      
      setLoading(false);
      if (res.ok) {
        setError(error.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
          console.log(`Upload is ${progress}% done`);
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

  const handleDeleteImage = (index) => {
    setFormdata({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (type === "checkbox") {
      setFormdata({ ...formData, [id]: checked });
    } else if (type === "number") {
      setFormdata({ ...formData, [id]: Number(value) });
    } else {
      setFormdata({ ...formData, [id]: value });
    }

    if (id === "sale" || id === "rent") {
      setFormdata({ ...formData, type: id });
    }
  };

  return (
    <main className="p-3 flex-1 mx-auto max-w-4xl">
      <h1 className="text-3xl text-center my-3 font-semibold">
        Create a Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-10 my-8"
      >
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="63"
            minLength="5"
            className="p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            id="description"
            placeholder="Description"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-6">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-6">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-6">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-6">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-6">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 my-4">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 w-20 border border-gray-600 rounded-lg"
                min="1"
                id="bedrooms"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 w-20 border border-gray-600 rounded-lg"
                min="1"
                id="bathrooms"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 w-20 border border-gray-600 rounded-lg"
                min="100"
                required
                id="regularPrice"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div>
                <p>Regular Price</p>
                <span>($ / month)</span>
              </div>
            </div>
          {formData.offer && (
              <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 w-20 border border-gray-600 rounded-lg"
                min="0"
                max='100000'
                required
                id="discountPrice"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div>
                <p>Discounted Price</p>
                <span>($ / month)</span>
              </div>
            </div>
          )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600">
              The first image will be the cover (max-6)
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
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex justify-between">
                <img
                  src={url}
                  alt="listing image"
                  className="w-24 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  type="button"
                  className="text-red-700 uppercase rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            type="submit"
            disabled={loading || uploading}
            className="p-3 border bg-gray-700 text-white my-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-85"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
