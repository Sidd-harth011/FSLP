export default function SuccessPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 overflow-hidden flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-6">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Successfully Registered!</h1>
              <p className="text-white/90 text-lg">Welcome to our community</p>
            </div>
          </div>

          <div className="p-8 text-center space-y-6">
            {/* Success Message */}
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">Account Created Successfully!</h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                Your account has been created and you're now part of our community. We've sent a confirmation email to
                your registered email address.
              </p>
            </div>

            {/* Features List */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Check your email for verification link</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Complete your profile setup</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Start exploring our platform</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300">
                Go to Dashboard
              </button>

              <div className="flex space-x-4">
                <button className="flex-1 h-10 text-sm font-medium border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200">
                  Complete Profile
                </button>

                <button className="flex-1 h-10 text-sm font-medium border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200">
                  Browse Features
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help? Contact our{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                  support team
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>

        {/* Floating Success Icons */}
        <div className="absolute top-32 right-32 w-8 h-8 bg-green-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-purple-300 rounded-full opacity-40 animate-bounce delay-300"></div>
      </div>
    </div>
  )
}
