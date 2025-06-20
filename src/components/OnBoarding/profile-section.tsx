export function ProfileSection() {
  const getRandomColor = () => {
    const colors = ["#006666"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-black">Help us get to know you better</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Personal Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Home Address
            </label>
            <div className="relative">
              <input
                id="address"
                type="text"
                placeholder="123 Main St, City, State"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="emergency" className="block text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <input
              id="emergency"
              type="text"
              placeholder="Name and phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Preferences</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded"
              style={{ accentColor: getRandomColor() }}
            />
            <span className="text-sm text-black">Subscribe to company newsletter</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded"
              style={{ accentColor: getRandomColor() }}
            />
            <span className="text-sm text-black">Notify me about company events</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 text-white rounded-md bg-[#006666] transition-colors">Save Profile</button>
      </div>
    </div>
  )
}
