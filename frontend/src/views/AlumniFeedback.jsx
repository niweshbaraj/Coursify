import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormBox from '../components/FormBox.jsx';
import Button from '../components/Button.jsx';

export default function AlumniFeedback() {
    const { currentUser } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile); 
    return (
        <div className='flex'>
            <div className="row-span-2 h-screen w-4/5 bg-orange-500">
        <div>
          <img
            // src="https://c8.alamy.com/comp/2RJ89AN/hipster-bearded-man-face-fashion-guy-with-hat-and-glasses-cartoon-vector-illustration-2RJ89AN.jpg"
            src={`data:image/png;base64, ${userProfile && userProfile.profile_pic}`}
            alt="StudentImage"
            className="flex items-center justify-center w-[220px] h-[200px] self-center cursor-pointer rounded-full object-cover mt-10 mx-auto"
          />

          <div className="flex flex-col items-center justify-center mt-8 p-4 mx-auto">
            <p className="text-white font-bold font-['Arimo']">{userProfile && userProfile.name}</p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.primary_email}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.contact}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.address}
            </p>
            <p className="text-white font-bold font-['Arimo']">
            {userProfile && userProfile.city} {userProfile && userProfile.state} {userProfile && userProfile.pincode} {userProfile && userProfile.country}
            </p>
          </div>
        </div>
          <button type="button"
          className="flex items-center justify-center bg-white text-orange-500 
                    text-md font-bold rounded-[30px] tracking-[2px] 
                    uppercase mt-10 mx-auto hover:bg-slate-300 py-4 px-3 "
        >
            <Link to={`/view_profile/${currentUser.id}`}>
                View Full Profile
            </Link>
        </button>
        
      </div>
            <div className='w-2/3'>
                <div className='container relative bg-zinc-300 rounded-[10px] h-[90vh] w-[60vw] mt-10 mr-5 ml-3 mb-10'>
                    <h1 className="text-3xl text-center tracking-[2px] font-bold pt-5 uppercase">Feedback</h1>
                    <form className="flex flex-col mt-10">
                        <div className='flex pl-10 gap-x-20 mb-7'>
                            <label className='uppercase font-bold tracking-[2px]'>Course</label>
                            <select id="courses" className='w-8/12 py-1.5 rounded-md border border-gray-300'>
                                <option>Choose a course</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>France</option>
                                <option>Germany</option>
                            </select>
                        </div>
                        <div className='flex pl-10 gap-x-28 mb-7'>
                            <label className='uppercase font-bold tracking-[2px]'>Term</label>
                            <div className='flex gap-x-16'>
                                <select id="month" placeholder="Month" className="rounded-md w-56 py-1.5 border border-gray-300">
                                    <option>Term</option>
                                    <option>January</option>
                                    <option>May</option>
                                    <option>September</option>
                                </select>
                                <select id="year" placeholder="Year" className="rounded-md w-56 py-1.5 border border-gray-300">
                                    <option>Year</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex pl-10 gap-x-14'>
                            <label className='uppercase font-bold tracking-[2px]'>Feedback</label>
                            <textarea rows="10" cols="63" className='rounded-md border border-gray-300 p-2'></textarea>
                        </div>
                        <div className='justify-self-center absolute bottom-5 self-center'>
                            <Button padding="px-5 py-2.5" rounded="30px" ButtonName="SUBMIT" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
