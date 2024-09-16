import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div>
          <p>
            contact: <span>{landlord.username}</span> for{" "}
            <span>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            placeholder="Enter Your Message"
            className="w-full border p-3 rounded-lg my-3"
            onChange={onChangeMessage}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center px-32 mx-2 sm:px-[20vw] sm:ml-10  p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
