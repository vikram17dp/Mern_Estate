import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListingItem from "../compnents/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation()
  const [loading,setLoading] = useState(false);
  const [listing,setListing] = useState([]);
  const [showMore,setShowmore] = useState(false)
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const handlechange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
}
const fetchListing = async ()=>{
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`)
    const data = await res.json();
    if(data.length>8){
      setShowmore(true)
    }else{
      setShowmore(false)
    }
    setListing(data)
    setLoading(false)
    
}
fetchListing();
  },[location.search]);

const onShowmoreListings = async ()=>{
    const numberoflistings = listing.length;
    const startIndex = numberoflistings;
    const urlParams = new URLSearchParams();
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if(data.length< 9){
      setShowmore(false)
    }
    setListing([...listing,...data])
}
  return (
    <div className="flex flex-col md:flex-row ml-8 flex-wrap">
      <div className="py-7 border-b-2 md:border-r-2 md:min-h-screen ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search item:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="search..."
              className="p-3 mr-2 w-full border rounded-lg"
              onChange={handlechange}
              value={sidebardata.searchTerm}
            />
          </div>
          <div className="flex felx-col gap-2 items-center">
            <div className="flex gap-2">
              <label className="font-semibold">Type:</label>
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handlechange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handlechange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handlechange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handlechange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-col  ">
            <div className="flex gap-2">
              <div className="flex gap-2">
                <label className="font-semibold">Amenities:</label>
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handlechange}
                  checked={sidebardata.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handlechange}
                  checked={sidebardata.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex gap-2 items-center">
              <label className="font-semibold">Sort:</label>
              <select
                id="sort_order"
                className="p-3 rounded-lg border"
                onChange={handlechange}
                defaultValue={"created_at_desc"}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="p-3 bg-slate-700 md:w-full sm:w-[90vw] w-[90vw]  rounded-lg my-4 items-center uppercase text-white  ">
              search
            </button>
          </div>
        </form>
      </div>

      <div className="border-b-2 flex-1 gap-4">
        <h1 className="text-4xl p-3 font-semibold text-slate-700 mt-5">
          Lisiting Results:
        </h1>
     <div className="pt-5 flex flex-wrap">
     {!loading && listing.length ===0 &&(
       <p className="text-xl pl-4 text-slate-700">No Listing is found!</p>
      )}
      {loading && (
        <p className="text-slate-700 text-2xl text-center w-full">loading...</p>
      )}
      {!loading && listing.map((listing)=><ListingItem  key={listing._id} listing={listing}/>)}
      </div>
      {showMore && (
        <button onClick={onShowmoreListings} className="text-green-700 text-md text-center hover:underline p-10 w-full ">
          show more
        </button>
      )}
     </div>
    </div>
  );
}
