import { useEffect, React, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateInFailure,
  updateInStart,
  updateInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileuploaderror, setFileuploaderror] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [updatedSuccess,setUpdatedSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
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

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(currentUser);
    dispatch(updateInStart());

    const userId = currentUser._id;
    try {
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateInFailure("Email already in use."));
        setUpdatedSuccess(false);
        return;
      }
      if(res.ok){
        dispatch(updateInSuccess(data));
        setUpdatedSuccess(true);
        navigate('/profile');
      }
      
    } catch (error) {
      dispatch(updateInFailure(error.message));
      setUpdatedSuccess(false);

    }
  };

  return (
    <div className="max-w-full mx-auto ">
      <h1 className="text-4xl font-semibold  text-center my-14">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:w-1/3 sm:mx-auto mr-4 ml-4"
      >
        <input
          type="file"
          hidden
          id="file"
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
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95">
          {loading ? 'Loading...':'UPDATE'}
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
      <p className="text-red-700 mt-5 text-center max-w-full">{error ? error : ''}</p>
      <p className="text-green-700  text-center max-w-full">{updatedSuccess ? 'user Successfully updated!' : ''}</p>
    </div>

  );
}

export default Profile;
