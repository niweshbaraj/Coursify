/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import FormBox from "../components/FormBox.jsx";

// eslint-disable-next-line react/prop-types
function AddressDetails({ formData, setFormData, disable }) {

  return (
    <div className="grid grid-rows-6 justify-start gap-y-3">
    <div className="flex items-start flex-col">
      <label
        htmlFor="secondary_email"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        Secondary Email
      </label>
      <input
        type="email"
        id="secondary_email"
        value={formData.secondary_email}
        onChange={(e) => {
          setFormData({ ...formData, secondary_email: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>

    <div className="flex items-start flex-col">
      <label
        htmlFor="address"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        Address 
      </label>
      <input
        type="text"
        id="address"
        value={formData.address}
        onChange={(e) => {
          setFormData({ ...formData, address: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>

    <div className="flex items-start flex-col">
      <label
        htmlFor="city"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        City
      </label>
      <input
        type="text"
        id="city"
        value={formData.city}
        onChange={(e) => {
          setFormData({ ...formData, city: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>

    <div className="flex items-start flex-col">
      <label
        htmlFor="state"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        State
      </label>
      <input
        type="text"
        id="state"
        value={formData.state}
        onChange={(e) => {
          setFormData({ ...formData, state: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>

    <div className="flex items-start flex-col">
      <label
        htmlFor="pincode"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        Pincode 
      </label>
      <input
        type="text"
        id="pincode"
        value={formData.pincode}
        onChange={(e) => {
          setFormData({ ...formData, pincode: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>
    
    <div className="flex items-start flex-col">
      <label
        htmlFor="country"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        country 
      </label>
      <input
        type="text"
        id="country"
        value={formData.country}
        onChange={(e) => {
          setFormData({ ...formData, country: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>

    <div className="flex items-start flex-col">
      <label
        htmlFor="contact"
        className="text-lg font-semibold tracking-[1px] uppercase"
      >
        contact
      </label>
      <input
        type="text"
        id="contact"
        value={formData.contact}
        onChange={(e) => {
          setFormData({ ...formData, contact: e.target.value });
        }}
        disabled={disable}
        className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
      />
    </div>

  </div>
  );
}

export default AddressDetails;
