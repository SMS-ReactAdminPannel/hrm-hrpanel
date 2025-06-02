import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MapPin, 
  Phone, 
  Mail, 
  Building, 
  UserCheck, 
  TrendingUp,
  FileText,
  X,
  ChevronRight,
  Badge,
  Plus,
  MoreVertical,
  Bell,
  Settings
} from 'lucide-react';

// TypeScript interfaces
interface VisitorStats {
  total: number;
  today: number;
  upcoming: number;
  checkIn: number;
}

interface Visitor {
  id: number;
  name: string;
  company: string;
  time: string;
  date?: string;
  purpose: string;
  status: 'checked-in' | 'scheduled' | 'completed';
  employee: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  visitorsToday: number;
  status: 'available' | 'busy' | 'in-meeting';
  experience: string;
  joinDate: string;
  skills: string[];
  education: string;
  documents: string[];
}

// Centralized styles
const styles = {
  fonts: {
    header: "font-['Poppins'] font-normal text-[32px]",
    paragraph: "font-['Poppins'] font-normal text-[14px]",
    body: "font-['Poppins']"
  }
};

const VisitorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'visitors' | 'employees'>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  const visitorStats: VisitorStats = {
    total: 1247,
    today: 23,
    upcoming: 15,
    checkIn: 8
  };

  const dailyVisitors: Visitor[] = [
    { id: 1, name: 'John Smith', company: 'Tech Corp', time: '09:30 AM', purpose: 'Interview', status: 'checked-in', employee: 'Sarah Wilson' },
    { id: 2, name: 'Emily Davis', company: 'Design Studio', time: '10:15 AM', purpose: 'Meeting', status: 'scheduled', employee: 'Mike Johnson' },
    { id: 3, name: 'Robert Brown', company: 'Marketing Inc', time: '11:00 AM', purpose: 'Presentation', status: 'completed', employee: 'Lisa Chen' },
    { id: 4, name: 'Maria Garcia', company: 'Consulting LLC', time: '02:30 PM', purpose: 'Discussion', status: 'checked-in', employee: 'David Kumar' },
    { id: 5, name: 'James Wilson', company: 'Software Solutions', time: '03:45 PM', purpose: 'Demo', status: 'scheduled', employee: 'Anna Rodriguez' }
  ];

  const upcomingVisitors: Visitor[] = [
    { id: 6, name: 'Alex Thompson', company: 'Innovation Labs', date: '2025-06-03', time: '09:00 AM', purpose: 'Interview', employee: 'Sarah Wilson', status: 'scheduled' },
    { id: 7, name: 'Sophie Martinez', company: 'Creative Agency', date: '2025-06-03', time: '11:30 AM', purpose: 'Portfolio Review', employee: 'Mike Johnson', status: 'scheduled' },
    { id: 8, name: 'Daniel Lee', company: 'Tech Startup', date: '2025-06-04', time: '10:00 AM', purpose: 'Partnership', employee: 'Lisa Chen', status: 'scheduled' }
  ];

  const employees: Employee[] = [
    { 
      id: 1, 
      name: 'Sarah Wilson', 
      position: 'Senior HR Manager', 
      department: 'Human Resources',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b25ae6be?w=150&h=150&fit=crop&crop=face',
      visitorsToday: 3,
      status: 'available',
      experience: '8 years',
      joinDate: '2019-03-15',
      skills: ['Recruitment', 'Employee Relations', 'Performance Management'],
      education: 'MBA in Human Resources',
      documents: ['Resume', 'Certifications', 'Performance Reviews']
    },
    { 
      id: 2, 
      name: 'Mike Johnson', 
      position: 'Technical Lead', 
      department: 'Engineering',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      visitorsToday: 2,
      status: 'busy',
      experience: '6 years',
      joinDate: '2020-07-22',
      skills: ['React', 'Node.js', 'System Design'],
      education: 'MS Computer Science',
      documents: ['Resume', 'Project Portfolio', 'Technical Certifications']
    },
    { 
      id: 3, 
      name: 'Lisa Chen', 
      position: 'Marketing Director', 
      department: 'Marketing',
      email: 'lisa.chen@company.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      visitorsToday: 1,
      status: 'available',
      experience: '10 years',
      joinDate: '2018-01-10',
      skills: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
      education: 'MBA Marketing',
      documents: ['Resume', 'Campaign Reports', 'Certifications']
    },
    { 
      id: 4, 
      name: 'David Kumar', 
      position: 'Sales Manager', 
      department: 'Sales',
      email: 'david.kumar@company.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      visitorsToday: 4,
      status: 'in-meeting',
      experience: '5 years',
      joinDate: '2021-09-05',
      skills: ['B2B Sales', 'Client Relations', 'Negotiation'],
      education: 'Bachelor in Business',
      documents: ['Resume', 'Sales Reports', 'Client Testimonials']
    }
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || emp.status === filterStatus)
  );

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'available': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'busy': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'in-meeting': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'checked-in': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'scheduled': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'completed': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const StatCard: React.FC<{
    icon: React.ElementType;
    title: string;
    value: number;
    trend?: string;
    color: string;
  }> = ({ icon: Icon, title, value, trend, color }) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-lg hover:bg-white/80 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className={`${styles.fonts.paragraph} text-slate-600 mb-2`}>{title}</p>
          <p className={`${styles.fonts.header} text-slate-800 mb-1`}>{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
              <span className={`${styles.fonts.paragraph} text-emerald-600`}>{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );

  const VisitorCard: React.FC<{ visitor: Visitor; showDate?: boolean }> = ({ visitor, showDate = false }) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 p-5 hover:shadow-md hover:bg-white/80 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm">
              {visitor.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h4 className={`${styles.fonts.body} font-semibold text-slate-800`}>{visitor.name}</h4>
            <p className={`${styles.fonts.paragraph} text-slate-500`}>{visitor.company}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(visitor.status)}`}>
          {visitor.status.replace('-', ' ')}
        </span>
      </div>
      <div className="space-y-2">
        {showDate && (
          <div className="flex items-center text-slate-600">
            <Calendar className="w-4 h-4 mr-3 text-teal-500" />
            <span className={styles.fonts.paragraph}>{visitor.date}</span>
          </div>
        )}
        <div className="flex items-center text-slate-600">
          <Clock className="w-4 h-4 mr-3 text-teal-500" />
          <span className={styles.fonts.paragraph}>{visitor.time}</span>
        </div>
        <div className="flex items-center text-slate-600">
          <Building className="w-4 h-4 mr-3 text-teal-500" />
          <span className={styles.fonts.paragraph}>{visitor.purpose}</span>
        </div>
        <div className="flex items-center text-slate-600">
          <UserCheck className="w-4 h-4 mr-3 text-teal-500" />
          <span className={styles.fonts.paragraph}>Meeting with {visitor.employee}</span>
        </div>
      </div>
    </div>
  );

  const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 p-5 hover:shadow-lg hover:bg-white/80 transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedEmployee(employee)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={employee.avatar} 
              alt={employee.name}
              className="w-14 h-14 rounded-xl object-cover shadow-md"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              employee.status === 'available' ? 'bg-emerald-400' : 
              employee.status === 'busy' ? 'bg-amber-400' : 'bg-rose-400'
            }`} />
          </div>
          <div>
            <h4 className={`${styles.fonts.body} font-semibold text-slate-800 group-hover:text-teal-700 transition-colors`}>
              {employee.name}
            </h4>
            <p className={`${styles.fonts.paragraph} text-slate-500`}>{employee.position}</p>
            <p className={`${styles.fonts.paragraph} text-slate-400 text-xs`}>{employee.department}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-slate-600">
            <Users className="w-4 h-4 mr-2 text-teal-500" />
            <span className={styles.fonts.paragraph}>{employee.visitorsToday} visitors</span>
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
            {employee.status.replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );

  const EmployeeModal: React.FC<{ employee: Employee; onClose: () => void }> = ({ employee, onClose }) => (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-8 py-6 flex items-center justify-between">
          <h2 className={`${styles.fonts.header} text-slate-800`}>Employee Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-8 text-white text-center mb-6 shadow-lg">
                <div className="relative inline-block mb-6">
                  <img 
                    src={employee.avatar} 
                    alt={employee.name}
                    className="w-28 h-28 rounded-2xl mx-auto border-4 border-white/30 shadow-lg"
                  />
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${
                    employee.status === 'available' ? 'bg-emerald-400' : 
                    employee.status === 'busy' ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                </div>
                <h3 className={`${styles.fonts.body} text-xl font-bold mb-2`}>{employee.name}</h3>
                <p className={`${styles.fonts.paragraph} text-white/80 mb-3`}>{employee.position}</p>
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  {employee.status.replace('-', ' ')}
                </span>
              </div>
              
              <div className="bg-slate-50/70 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-white/50">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-4 text-teal-500" />
                  <span className={`${styles.fonts.paragraph} text-slate-700`}>{employee.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-4 text-teal-500" />
                  <span className={`${styles.fonts.paragraph} text-slate-700`}>{employee.phone}</span>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-4 text-teal-500" />
                  <span className={`${styles.fonts.paragraph} text-slate-700`}>{employee.department}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-4 text-teal-500" />
                  <span className={`${styles.fonts.paragraph} text-slate-700`}>Joined {employee.joinDate}</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm">
                  <h4 className={`${styles.fonts.body} font-semibold text-slate-800 mb-3`}>Experience</h4>
                  <p className="text-3xl font-bold text-teal-600">{employee.experience}</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm">
                  <h4 className={`${styles.fonts.body} font-semibold text-slate-800 mb-3`}>Visitors Today</h4>
                  <p className="text-3xl font-bold text-cyan-600">{employee.visitorsToday}</p>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 mb-6 shadow-sm">
                <h4 className={`${styles.fonts.body} font-semibold text-slate-800 mb-4`}>Education</h4>
                <p className={`${styles.fonts.paragraph} text-slate-700`}>{employee.education}</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 mb-6 shadow-sm">
                <h4 className={`${styles.fonts.body} font-semibold text-slate-800 mb-4`}>Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {employee.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium border border-teal-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm">
                <h4 className={`${styles.fonts.body} font-semibold text-slate-800 mb-4`}>Documents & Resume</h4>
                <div className="space-y-3">
                  {employee.documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50/70 rounded-xl hover:bg-slate-100/70 transition-colors border border-white/50"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-teal-500 mr-4" />
                        <span className={`${styles.fonts.body} font-medium text-slate-800`}>{doc}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 ${styles.fonts.body}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className={`${styles.fonts.header} text-slate-800 mb-2`}>Visitor Management</h1>
            <p className={`${styles.fonts.paragraph} text-slate-600`}>
              Comprehensive visitor tracking and employee interaction management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg">
              <Plus className="w-5 h-5" />
              <span className={styles.fonts.paragraph}>Add Visitor</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-sm">
            <nav className="flex space-x-2">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                { id: 'visitors', name: 'Visitors', icon: Users },
                { id: 'employees', name: 'Employees', icon: UserCheck }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                title="Total Visitors" 
                value={visitorStats.total} 
                trend="+12.5%" 
                color="bg-gradient-to-br from-teal-500 to-teal-600" 
              />
              <StatCard 
                icon={Calendar} 
                title="Today's Visitors" 
                value={visitorStats.today} 
                trend="+8.3%" 
                color="bg-gradient-to-br from-cyan-500 to-cyan-600" 
              />
              <StatCard 
                icon={Clock} 
                title="Upcoming" 
                value={visitorStats.upcoming} 
                color="bg-gradient-to-br from-indigo-500 to-indigo-600" 
              />
              <StatCard 
                icon={UserCheck} 
                title="Checked In" 
                value={visitorStats.checkIn} 
                color="bg-gradient-to-br from-emerald-500 to-emerald-600" 
              />
            </div>

            {/* Visitor Lists */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Daily Visitors */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
                <div className="p-6 border-b border-slate-200/50">
                  <div className="flex items-center justify-between">
                    <h3 className={`${styles.fonts.body} text-lg font-semibold text-slate-800`}>Today's Visitors</h3>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      {dailyVisitors.length}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                  {dailyVisitors.map(visitor => (
                    <VisitorCard key={visitor.id} visitor={visitor} />
                  ))}
                </div>
              </div>

              {/* Upcoming Visitors */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
                <div className="p-6 border-b border-slate-200/50">
                  <div className="flex items-center justify-between">
                    <h3 className={`${styles.fonts.body} text-lg font-semibold text-slate-800`}>Upcoming Visitors</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {upcomingVisitors.length}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                  {upcomingVisitors.map(visitor => (
                    <VisitorCard key={visitor.id} visitor={visitor} showDate={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'visitors' || activeTab === 'employees') && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50 backdrop-blur-sm ${styles.fonts.paragraph}`}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`pl-12 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50 backdrop-blur-sm ${styles.fonts.paragraph}`}
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="in-meeting">In Meeting</option>
                  </select>
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-md">
                  <Download className="w-5 h-5" />
                  <span className={styles.fonts.paragraph}>Export</span>
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'visitors' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* All visitors combined */}
                {[...dailyVisitors, ...upcomingVisitors]
                  .filter(visitor => 
                    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    visitor.company.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(visitor => (
                    <VisitorCard key={visitor.id} visitor={visitor} showDate={!!visitor.date} />
                  ))}
              </div>
            )}

            {activeTab === 'employees' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEmployees.map(employee => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Employee Modal */}
      {selectedEmployee && (
        <EmployeeModal 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default VisitorManagement;