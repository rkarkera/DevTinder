import axios from "axios";
import { API_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/userSlice";


const Premium = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const verifyPremiumUser = async () => {
     try {
       const { data } = await axios.get(`${API_URL}/payment/verify`,{withCredentials:true});
       dispatch(addUser(data.userObj));
     } catch (error) {
      console.log(error.response?.data?.message);
     }
  }

  const handlePremium = async (type) => {
    try {

      const {data} = await axios.post(`${API_URL}/payment/create`,{type},{withCredentials:true});
      
      const {amount, currency, orderId, notes} = data.paymentCreated;

      const options = {
        key: data.keyId, 
        amount, 
        currency,
        name: 'DevTinder',
        description: 'Connect with other user',
        order_id: orderId, 
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler : verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  if (user?.isPremium) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body text-center">
          <h2 className="text-3xl font-bold">
            🎉 Premium Active
          </h2>

          <p className="mt-4 text-lg">
            You already have the{" "}
            <span className="font-bold capitalize text-warning">
              {user.package}
            </span>{" "}
            package.
          </p>

          <p className="text-base-content/70">
            Enjoy all premium features of DevTinder.
          </p>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">
          Upgrade Your Account
        </h1>

        <p className="text-center text-base-content/70 mb-10">
          Unlock premium networking features and connect with more developers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-2xl border border-slate-300">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title text-3xl">🥈 Silver</h2>
                <div className="badge badge-secondary badge-lg">
                  Popular
                </div>
              </div>

              <p className="text-5xl font-bold mt-4">
                ₹299
                <span className="text-sm font-normal text-base-content/60">
                  /3 months
                </span>
              </p>

              <div className="divider"></div>

              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  ✅ Chat with other people
                </li>

                <li className="flex items-center gap-2">
                  ✅ 100 connection requests per day
                </li>

                <li className="flex items-center gap-2">
                  ✅ Verified Blue Tick
                </li>

                <li className="flex items-center gap-2">
                  ✅ Valid for 3 months
                </li>
              </ul>

              <div className="card-actions mt-8">
                <button className="btn btn-outline btn-primary w-full" onClick={() => handlePremium("silver")}>
                  Get Silver
                </button>
              </div>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="card bg-base-100 shadow-2xl border-2 border-warning relative">
            <div className="absolute top-4 right-4 badge badge-warning badge-lg">
              BEST VALUE
            </div>

            <div className="card-body">
              <h2 className="card-title text-3xl">👑 Gold</h2>

              <p className="text-5xl font-bold mt-4 text-warning">
                ₹499
                <span className="text-sm font-normal text-base-content/60">
                  /6 months
                </span>
              </p>

              <div className="divider"></div>

              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  ✅ Chat with other people
                </li>

                <li className="flex items-center gap-2">
                  ✅ Unlimited connection requests
                </li>

                <li className="flex items-center gap-2">
                  ✅ Verified Blue Tick
                </li>

                <li className="flex items-center gap-2">
                  ✅ Valid for 6 months
                </li>
              </ul>

              <div className="card-actions mt-8">
                <button className="btn btn-warning w-full text-black" onClick={() => handlePremium("gold")}>
                  Get Gold
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-base-content/60 mt-8">
          Secure payments • Cancel anytime • Instant activation
        </p>
      </div>
    </div>
  );
};

export default Premium;