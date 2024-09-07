import { useEffect, React, useRef, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileuploaderror, setFileuploaderror] = useState(false);
  const [formdata, setFormdata] = useState({});
  // console.log(formdata);
  // console.log(filePerc);
  // console.log(fileuploaderror);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (Error) => {
        setFileuploaderror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormdata({ ...formdata, avatar: downloadURL })
        );
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="max-w-full mx-auto ">
      <h1 className="text-4xl font-semibold  text-center my-14">Profile</h1>
      <form className="flex flex-col gap-4 sm:w-1/3 sm:mx-auto mr-4 ml-4">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formdata.avatar || currentUser.avatar}
          alt="profile"
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover"
        />
        <p className="text-center">
          {fileuploaderror ? (
            <span className="text-red-700">Error Image upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image Successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg "
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95">
          UPDATE
        </button>
        <button className="bg-green-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95 uppercase">
          create listing
        </button>
      </form>
      <div className="flex  text-center justify-center gap-5 mt-4">
        <span className="text-red-700 cursor-pointer sm:mr-80 mr-40  ">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
