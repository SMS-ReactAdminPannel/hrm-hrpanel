import { useState } from "react";

import { User, Mail, Phone, Globe, Edit, Save, X, Plus, ExternalLink, Settings, Bell, Shield, Heart } from 'lucide-react';

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  language: string;
}

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    phone: '9780003455',
    department: 'HRM',
    language: 'English'
  });

  const [links, setLinks] = useState<Link[]>([
    { id: '1', title: 'LinkedIn Profile', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
    { id: '2', title: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' },
    { id: '3', title: 'Portfolio', url: 'https://johndoe.dev', icon: 'globe' },
    { id: '4', title: 'Twitter', url: 'https://twitter.com/johndoe', icon: 'twitter' }
  ]);

  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [showAddLink, setShowAddLink] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { 
        id: Date.now().toString(), 
        title: newLink.title, 
        url: newLink.url, 
        icon: 'link' 
      }]);
      setNewLink({ title: '', url: '' });
      setShowAddLink(false);
    }
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-blur-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-gray-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                ADMINISTRATOR
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {contactInfo.firstName} {contactInfo.lastName}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{contactInfo.department} Department</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Senior Manager</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Team Lead</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">5 Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-500" />
                Contact Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={contactInfo.firstName}
                      onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{contactInfo.firstName}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={contactInfo.lastName}
                      onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{contactInfo.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{contactInfo.email}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{contactInfo.phone}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">Department</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={contactInfo.department}
                      onChange={(e) => setContactInfo({...contactInfo, department: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{contactInfo.department}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </label>
                  {isEditing ? (
                    <select
                      value={contactInfo.language}
                      onChange={(e) => setContactInfo({...contactInfo, language: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-medium">{contactInfo.language}</p>
                  )}
                </div>
              </div>
            </div>
    
            {isEditing && (
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ExternalLink className="w-6 h-6 text-purple-500" />
                  Quick Links
                </h2>
                <button
                  onClick={() => setShowAddLink(!showAddLink)}
                  className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>
              
              {showAddLink && (
                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Link title"
                      value={newLink.title}
                      onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={newLink.url}
                      onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addLink}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddLink(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {links.map((link) => (
                  <div key={link.id} className="group relative bg-purple-300 p-4 rounded-xl hover:shadow-lg transition-all duration-300">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">{link.title}</span>
                    </a>
                    <button
                      onClick={() => removeLink(link.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-500" />
                Applications
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500 p-4 rounded-xl text-gray text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-8 h-8 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <p className="font-medium">Mobile</p>
                  <p className="text-sm opacity-80">iOS/Android</p>
                </div>
                
                <div className="bg-green-500 p-4 rounded-xl text-gray text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-8 h-8 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <p className="font-medium">Desktop</p>
                  <p className="text-sm opacity-80">Web Application</p>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                About Me
              </h2>
              <p className="text-gray-600 mb-4">
                Experienced HRM professional with a passion for building great teams and fostering positive workplace culture. I specialize in talent acquisition, employee development, and organizational strategy.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Team Building</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Leadership</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Strategic Planning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;