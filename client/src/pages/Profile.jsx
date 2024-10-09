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
  deleteUserfaliure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  updateInFailure,
  updateInStart,
  updateInSuccess,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileuploaderror, setFileuploaderror] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      if (res.ok) {
        dispatch(updateInSuccess(data));
        setUpdatedSuccess(true);
      }
    } catch (error) {
      dispatch(updateInFailure(error.message));
      setUpdatedSuccess(false);
    }
  };

  const handleDelete = async () => {
    try {
      const userId = currentUser._id;
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserfaliure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/signin");
    } catch (error) {
      dispatch(deleteUserfaliure(error.message));
    }
  };

  const handlesignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess());
      navigate('/signin')
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };
  const handleShowListing = async () => {
    try {
      setUserListings([]);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();

      if (data.success == false) {
        setUserListings(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setUserListings(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
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
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95"
        >
          {loading ? "Loading..." : "UPDATE"}
        </button>
        <Link
          to={"/createListing"}
          className="bg-green-700 p-3 rounded-lg text-white hover:opacity-80 disabled:opacity-95 uppercase text-center"
        >
          create listing
        </Link>
      </form>
      <div className="flex  text-center justify-center gap-5 mt-4">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer sm:mr-80 mr-40  "
        >
          Delete Account
        </span>
        <span onClick={handlesignout} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5 text-center max-w-full">
        {error
          ? typeof error === "string"
            ? error
            : JSON.stringify(error)
          : ""}
      </p>
      <p className="text-green-700  text-center max-w-full">
        {updatedSuccess ? "user Successfully updated!" : ""}
      </p>

      <button
        onClick={handleShowListing}
        className="text-green-700 text-xl  font-semibold  w-full"
      >
        show listings
      </button>

      {Array.isArray(userListings) && userListings.length > 0 && (
        <div className="flex flex-col ">
          <h1 className="text-2xl font-semibold text-center mt-10">
            Your Listing
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className=" flex items-center mb-6 justify-between p-3 border  gap-3 w-[80%] sm:w-[35%] mx-auto mt-10 rounded-lg"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listning cover"
                  className="h-20 w-20 object-contain"
                />
              </Link>

              <Link
                className="text-slate-600 font-semibold hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col pr-4 ">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 font-semibold uppercase"
                >
                  <p>Delete</p>
                </button>
                <Link to={`/updateListing/${listing._id}`}>
                  <button className="text-green-700 font-semibold uppercase">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
