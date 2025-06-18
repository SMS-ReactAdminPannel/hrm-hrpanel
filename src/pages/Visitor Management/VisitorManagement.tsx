import React, { useState, useEffect } from 'react';
import { Search, Users, Clock, TrendingUp, CheckCircle, XCircle, User, Building, Phone, Mail, Calendar } from 'lucide-react';
import { FONTS } from '../../constants/uiConstants';

// Types
interface Visitor {
  id: number;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  host: string;
  department?: string;
  purpose: string;
  notes?: string;
  checkIn: Date;
  checkOut?: Date;
}

interface VisitorFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  host: string;
  department: string;
  purpose: string;
  notes: string;
}

interface DashboardStats {
  todayVisitors: number;
  currentlyIn: number;
  totalVisitors: number;
  avgDuration: number;
}

type TabType = 'checkin' | 'visitors' | 'history' | 'dashboard';

const VisitorManagementSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('checkin');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [visitHistory, setVisitHistory] = useState<Visitor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [formData, setFormData] = useState<VisitorFormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    host: '',
    department: '',
    purpose: '',
    notes: ''
  });

  // Initialize sample data
  useEffect(() => {
    const sampleHistory: Visitor[] = [
      {
        id: 1,
        name: "John Smith",
        phone: "+1-555-0123",
        email: "john.smith@email.com",
        company: "Tech Solutions Inc",
        host: "Sarah Johnson",
        department: "HR",
        purpose: "Interview",
        checkIn: new Date(Date.now() - 86400000),
        checkOut: new Date(Date.now() - 82800000),
        notes: "Software developer interview"
      },
      {
        id: 2,
        name: "Maria Garcia",
        phone: "+1-555-0124",
        company: "ABC Corp",
        host: "Mike Davis",
        department: "Sales",
        purpose: "Meeting",
        checkIn: new Date(Date.now() - 7200000),
        checkOut: new Date(Date.now() - 3600000),
        notes: "Quarterly review meeting"
      }
    ];
    setVisitHistory(sampleHistory);
  }, []);

  // Auto-hide alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.host || !formData.purpose) {
      setAlert({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }
    
    const newVisitor: Visitor = {
      id: Date.now(),
      ...formData,
      checkIn: new Date()
    };
    
    setVisitors(prev => [...prev, newVisitor]);
    setAlert({ message: 'Visitor checked in successfully!', type: 'success' });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      host: '',
      department: '',
      purpose: '',
      notes: ''
    });
  };

  const checkOut = (visitorId: number) => {
    const visitor = visitors.find(v => v.id === visitorId);
    if (visitor) {
      const updatedVisitor = { ...visitor, checkOut: new Date() };
      setVisitHistory(prev => [...prev, updatedVisitor]);
      setVisitors(prev => prev.filter(v => v.id !== visitorId));
      setAlert({ message: 'Visitor checked out successfully!', type: 'success' });
    }
  };

  const getDashboardStats = (): DashboardStats => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisits = visitHistory.filter(visit => visit.checkIn >= today).length + visitors.length;
    const currentlyIn = visitors.length;
    const totalVisits = visitHistory.length + visitors.length;
    
    const completedVisits = visitHistory.filter(visit => visit.checkOut);
    const avgDuration = completedVisits.length > 0 ? 
      Math.round(completedVisits.reduce((sum, visit) => 
        sum + ((visit.checkOut!.getTime() - visit.checkIn.getTime()) / (1000 * 60)), 0) / completedVisits.length) : 0;
    
    return { todayVisitors: todayVisits, currentlyIn, totalVisitors: totalVisits, avgDuration };
  };

  const getFilteredHistory = (): Visitor[] => {
    let filtered = [...visitHistory];
    
    if (dateFrom) {
      filtered = filtered.filter(visit => visit.checkIn >= new Date(dateFrom));
    }
    
    if (dateTo) {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59);
      filtered = filtered.filter(visit => visit.checkIn <= endDate);
    }
    
    if (historySearch) {
      const search = historySearch.toLowerCase();
      filtered = filtered.filter(visit => 
        visit.name.toLowerCase().includes(search) ||
        visit.company?.toLowerCase().includes(search) ||
        visit.host.toLowerCase().includes(search) ||
        visit.purpose.toLowerCase().includes(search)
      );
    }
    
    return filtered.sort((a, b) => b.checkIn.getTime() - a.checkIn.getTime());
  };

  const getFilteredCurrentVisitors = (): Visitor[] => {
    if (!searchTerm) return visitors;
    
    const search = searchTerm.toLowerCase();
    return visitors.filter(visitor => 
      visitor.name.toLowerCase().includes(search) ||
      visitor.company?.toLowerCase().includes(search) ||
      visitor.host.toLowerCase().includes(search) ||
      visitor.purpose.toLowerCase().includes(search)
    );
  };

  const getRecentActivity = (): Visitor[] => {
    return [...visitHistory, ...visitors]
      .sort((a, b) => b.checkIn.getTime() - a.checkIn.getTime())
      .slice(0, 5);
  };

  const getTopHosts = (): Array<[string, number]> => {
    const hostCounts: Record<string, number> = {};
    [...visitHistory, ...visitors].forEach(visit => {
      hostCounts[visit.host] = (hostCounts[visit.host] || 0) + 1;
    });
    
    return Object.entries(hostCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const formatDuration = (checkIn: Date, checkOut?: Date): string => {
    if (!checkOut) return 'In progress';
    const duration = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
    return `${duration} minutes`;
  };

  const TabButton: React.FC<{ tab: TabType; icon: React.ReactNode; children: React.ReactNode }> = ({ tab, icon, children }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        activeTab === tab
          ? 'bg-white text-gray-800 shadow-lg transform scale-105'
          : 'text-white hover:bg-white/20'
      }`}
    >
      {icon}
      {children}
    </button>
  );

  const VisitorCard: React.FC<{ visitor: Visitor; showCheckOut?: boolean }> = ({ visitor, showCheckOut = false }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 "
      style={{
        fontSize: FONTS.paragraph.fontSize
        , fontFamily: FONTS.header.fontFamily
      }}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{visitor.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          visitor.checkOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {visitor.checkOut ? 'Completed' : 'Checked In'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{visitor.phone}</span>
        </div>
        {visitor.email && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{visitor.email}</span>
          </div>
        )}
        {visitor.company && (
          <div className="flex items-center gap-2 text-gray-600">
            <Building className="w-4 h-4" />
            <span>{visitor.company}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>Host: {visitor.host}</span>
        </div>
        {visitor.department && (
          <div className="flex items-center gap-2 text-gray-600">
            <span>Dept: {visitor.department}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <span>Purpose: {visitor.purpose}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{visitor.checkIn.toLocaleString()}</span>
        </div>
        {visitor.checkOut && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Duration: {formatDuration(visitor.checkIn, visitor.checkOut)}</span>
          </div>
        )}
      </div>
      
      {visitor.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600"><strong>Notes:</strong> {visitor.notes}</p>
        </div>
      )}
      
      {showCheckOut && (
        <div className="mt-4">
          <button
            onClick={() => checkOut(visitor.id)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Check Out
          </button>
        </div>
      )}
    </div>
  );

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-500">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
      <div className="text-gray-600 font-medium">{title}</div>
    </div>
  );

  const stats = getDashboardStats();

  return (
    <div>
    
    <div className="min-h-screen bg-gradient-to-br to-blue-800 ">
      <div className=" mx-auto">
        {/* Header */}
        <h1 className='mb-5'
            style={{
              fontSize: FONTS.header.fontSize
              , fontFamily: FONTS.header.fontFamily
            }}>Visitors Management </h1>
        {/* Navigation */}
          <div className="flex flex-wrap gap-2 bg-[#006666] backdrop-blur-lg rounded-md p-2 mb-8"
        style={{fontSize:FONTS.header3.fontSize
          ,fontFamily:FONTS.header.fontFamily
        }}>
          <TabButton tab="checkin" icon={<User className="w-5 h-5" />}>Check In</TabButton>
          <TabButton tab="visitors" icon={<Users className="w-5 h-5" />}>Current Visitors</TabButton>
          <TabButton tab="history" icon={<Clock className="w-5 h-5" />}>History</TabButton>
          <TabButton tab="dashboard" icon={<TrendingUp className="w-5 h-5" />}>Dashboard</TabButton>
        </div>

        {/* Alert */}
        {alert && (
          <div className={`mb-6 p-4 rounded-lg font-medium ${
            alert.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {alert.message}
          </div>
        )}

        {/* Tab Content */}
        <div className=" rounded-lg bg-white pb-10">
          {/* Check In Tab */}
          {activeTab === 'checkin' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8 py-4 pl-4"
                  style={{
                    fontSize: FONTS.header2.fontSize
                    , fontFamily: FONTS.header.fontFamily
              }}>Visitor Registration & Check-In</h2>
              
              <div className="space-y-6 px-6"
                  style={{
                    fontSize: FONTS.header3.fontSize
                    , fontFamily: FONTS.header.fontFamily
              }}>
                <div className="grid grid-cols-2 gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Host Name *</label>
                    <input
                      type="text"
                      name="host"
                      value={formData.host}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Host Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                          style={{
                            fontSize: FONTS.paragraph.fontSize
                            , fontFamily: FONTS.header.fontFamily
                      }}
                    >
                      <option value="">Select Department</option>
                      <option value="HR">Human Resources</option>
                      <option value="IT">Information Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose of Visit *</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                        style={{
                          fontSize: FONTS.paragraph.fontSize
                          , fontFamily: FONTS.header.fontFamily
                    }}
                  >
                    <option value="">Select Purpose</option>
                    <option value="Interview">Job Interview</option>
                    <option value="Meeting">Business Meeting</option>
                    <option value="Delivery">Delivery/Pickup</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Training">Training/Workshop</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                </div>

                <div>
                  <label className="block text-xm font-semibold text-gray-700 mb-2"
                      style={{
                        fontSize: FONTS.paragraph.fontSize
                        , fontFamily: FONTS.header.fontFamily
                  }}>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any additional information about the visit..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="text-black rounded-md px-4 py-2 rounded-md font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  Check In Visitor
                </button>
              </div>
            </div>
          )}

          {/* Current Visitors Tab */}
          {activeTab === 'visitors' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800  py-4 pl-4"
                  style={{
                    fontSize: FONTS.header3.fontSize
                    , fontFamily: FONTS.header.fontFamily
              }}>Current Visitors</h2>
              
              <div className="mb-6 py-4 px-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search visitors by name, company, or host..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-6 p-10">
                {getFilteredCurrentVisitors().length === 0 ? (
                  <div className="text-center ">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">No visitors currently checked in</h3>
                    <p className="text-gray-400">Check-in visitors will appear here</p>
                  </div>
                ) : (
                  getFilteredCurrentVisitors().map(visitor => (
                    <VisitorCard key={visitor.id} visitor={visitor} showCheckOut />
                  ))
                )}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className='grid py-4 px-6'>
              <h2 className="text-2xl font-bold text-gray-800"
                  style={{
                    fontSize: FONTS.header2.fontSize
                    , fontFamily: FONTS.header.fontFamily
              }}>Visit History</h2>
              <div className='flex item-center ml-auto '>
              <div className="relative">
              <div className="absolute inset-y-0 pb-2 mt-2 left-0 pl-3 flex items-center pointer-events-none ">
                <svg className="h-5  text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search History"
                 value={historySearch}
                 onChange={(e) => setHistorySearch(e.target.value)}
                className="block pl-10 px-4 py-2 w-40 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            </div>
                 
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
                  style={{
                    fontSize: FONTS.header3.fontSize
                    , fontFamily: FONTS.header.fontFamily
              }}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
               
              </div>

              <div className="space-y-6">
                {getFilteredHistory().length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">No visit history found</h3>
                    <p className="text-gray-400">Visit records will appear here</p>
                  </div>
                ) : (
                  getFilteredHistory().map(visitor => (
                    <VisitorCard key={visitor.id} visitor={visitor} />
                  ))
                )}
              </div>
            </div>
         
          )}
          

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 pb-8 py-4 pl-4"
                  style={{
                    fontSize: FONTS.header2.fontSize
                    , fontFamily: FONTS.header.fontFamily
              }}>Dashboard & Analytics</h2>
              
                <div className="grid grid-cols-4 md:grid-cols-2 rounded-lg lg:grid-cols-4 gap-6 mb-8 py-4 px-6 bg-[#006666]"
                  style={{
                    fontSize: FONTS.paragraph.fontSize
                    , fontFamily: FONTS.header.fontFamily
                  }}>
                <StatCard
                  title="Today's Visitors"
                  value={stats.todayVisitors}
                  icon={<Users className="w-8 h-8" />}
                />
                <StatCard
                  title="Currently In"
                  value={stats.currentlyIn}
                  icon={<CheckCircle className="w-8 h-8" />}
                />
                <StatCard
                  title="Total Visitors"
                  value={stats.totalVisitors}
                  icon={<TrendingUp className="w-8 h-8" />}
                />
                <StatCard
                  title="Avg Duration"
                  value={`${stats.avgDuration}m`}
                  icon={<Clock className="w-8 h-8" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6"
                      style={{
                        fontSize: FONTS.header2.fontSize
                        , fontFamily: FONTS.header.fontFamily
                      }}>Recent Activity</h3>
                  <div className="space-y-4">
                    {getRecentActivity().map((visit, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                      >
                        <div>
                          <div className="font-semibold text-gray-800"
                            style={{
                              fontSize: FONTS.header3.fontSize
                              , fontFamily: FONTS.header.fontFamily
                      }}>{visit.name}</div>
                          <div className="text-sm text-gray-600"
                            style={{
                              fontSize: FONTS.paragraph.fontSize
                              , fontFamily: FONTS.header.fontFamily
                      }}>{visit.purpose}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {visit.checkIn.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6"
                      style={{
                        fontSize: FONTS.header2.fontSize
                        , fontFamily: FONTS.header.fontFamily
                      }}>Top Hosts</h3>
                  <div className="space-y-4">
                    {getTopHosts().map(([host, count], index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-800"
                          style={{
                            fontSize: FONTS.header3.fontSize
                            , fontFamily: FONTS.header.fontFamily
                    }}>{host}</div>
                        <div className="text-sm font-semibold text-blue-600"
                          style={{
                            fontSize: FONTS.paragraph.fontSize
                            , fontFamily: FONTS.header.fontFamily
                    }}>{count} visits</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default VisitorManagementSystem;

function preventDefault() {
    throw new Error('Function not implemented.');
}
