import { z } from "zod";

export const AddressSchema = z.object({
    address: z.string({ required_error: "Address is required" }),
    lat: z.number({ required_error: "Latitude is required" }),
    lng: z.number({ required_error: "Longitude is required" }),
    country: z.string({ required_error: "Country is required" }),
    state: z.string({ required_error: "State is required" }),
    district: z.string({ required_error: "District is required" }),
});
