import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../compnents/ListingItem";

function Home() {
  const [offerListing, setOfferlisting] = useState([]);
  const [saleListing, setSalelisting] = useState([]);
  const [rentlisting, setRentlisting] = useState([]);
  SwiperCore.use([Navigation]);


  useEffect(() => {
    const fetchofferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=6");

        const data = await res.json();

        setOfferlisting(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=6");
        const data = await res.json();
        setSalelisting(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=6");
        const data = await res.json();
        setRentlisting(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchofferListings();
    fetchSaleListings();
    fetchRentListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col mx-auto p-28 px-3 max-w-6xl gap-6">
        <h1 className="text-3xl sm:text-6xl font-bold text-slate-700">
          Find your next <span className="text-slate-500">perfect </span>
          <br />
          place with ease
        </h1>
        <div>
          <p className="text-gray-500 text-sm sm:text-sm">
            EstateEase will help you find your home fast, easy and comfortable.
            <br />
            Our expert support are always available.
          </p>
        </div>
        <Link to="/search" className="text-blue-800 hover:underline">
          Lets start now....
        </Link>
      </div>
      {/*  fetching the offers */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 lex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3 ml-4">
              <h2 className="text-3xl text-slate-600 font-semibold ">
                Recent offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4">
              {offerListing.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>

            {/* fetching the rent detalils over here */}
            {rentlisting && rentlisting.length > 0 && (
              <div className="">
                <div className="my-3 ml-4">
                  <h2 className="text-3xl text-slate-600 font-semibold ">
                    Recent places for rent
                  </h2>
                  <Link
                    to={"/search?rent=true"}
                    className="text-sm text-blue-800 hover:underline"
                  >
                    Show more places for sale
                  </Link>
                </div>
                <div className="flex flex-wrap ">
                  {rentlisting &&
                    rentlisting.length > 0 &&
                    rentlisting.map((listing) => (
                      <ListingItem key={listing._id} listing={listing} />
                    ))}
                </div>
              </div>
            )}
            {/* fetching the sales details over here
             */}

            {saleListing && saleListing.length > 0 && (
              <div className="">
                <div className="my-3 ml-4">
                  <h2 className="text-3xl text-slate-600 font-semibold ">
                    Recent places for sale
                  </h2>
                  <Link
                    to={"/search?sale=true"}
                    className="text-sm text-blue-800 hover:underline"
                  >
                    Show more places for sales
                  </Link>
                </div>
                <div className="flex flex-wrap gap-6">
                  {saleListing &&
                    saleListing.length > 0 &&
                    saleListing.map((listing) => (
                      <ListingItem key={listing._id} listing={listing} />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
