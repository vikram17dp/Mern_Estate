import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(400, "Lsiting is not found"));
  }
  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(404, "You can only delete your listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listning is deleted Succesfully");
  } catch (error) {
    next(error);
  }
};

export const updatedListning = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing is not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "you can only update your account"));
  }

  try {
    const UpdatedListning = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(UpdatedListning);
  } catch (error) {
    next(error);
  }
};


export const getListing = async (req,res,next)=>{
    try {
      const GetListing = await Listing.findById(req.params.id);
      if(!GetListing){
        return next(errorHandler(404,'Lsiting is not found'))
      }
      res.status(200).json(GetListing);

    } catch (error) {
      next(error)
    }
}