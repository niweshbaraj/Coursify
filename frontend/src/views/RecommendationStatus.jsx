import { useSelector } from "react-redux";

export default function RecommendationStatus() {

    const { userProfile } = useSelector((state) => state.profile);

  return (
    <div className="grid grid-cols-4 grid-flow-col relative">
      <div className="h-screen w-4/5 bg-orange-500">
        <div>
          <img
            src={`data:image/png;base64, ${userProfile && userProfile.profile_pic}`}
            alt="StudentImage"
            className="flex items-center justify-center w-[220px] h-[200px] self-center cursor-pointer rounded-[40px] object-cover mt-10 mx-auto"
          />

          <div className="flex flex-col items-center justify-center mt-8 p-4 mx-auto">
            <p className="text-white font-bold font-['Arimo']">
            {userProfile && userProfile.name}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.primary_email}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.contact}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.address},
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.city}, {userProfile && userProfile.state}, {userProfile && userProfile.pincode},{" "}
              {userProfile && userProfile.country}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="container bg-gray-200 rounded-[20px] mt-10 mb-8 w-3/5 mx-auto px-7 py-5">
          <p className="font-semibold tracking-[1px] text-lg">
            Your recommended path is sent to the Academic Advisor for approval.
            You will be notified soon once they review and verify from their
            end. Check your email or here for status.
          </p>
        </div>
        <div className="container bg-gray-200 rounded-[20px] mt-20 mb-8 w-3/5 mx-auto px-7 py-5">
          <div className="flex flex-row justify-between">
            <p className="font-bold tracking-[2px] uppercase text-lg">
              Status :{" "}
            </p>
            <p className="font-bold tracking-[2px] uppercase text-lg">
              Waiting ...
            </p>
          </div>
          <div className="flex flex-row font-semibold tracking-[1px]">
            <p>Your Learning Path has been </p>
            <p className="ml-7 uppercase">Accepted / Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
