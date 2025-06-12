import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, User, Building, Phone, Mail, Calendar } from 'lucide-react';

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

const VisitorManagementSystem: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [visitHistory, setVisitHistory] = useState<Visitor[]>([]);
  const [historySearch, setHistorySearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

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
        email: "maria.garcia@email.com",
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

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const checkOut = (visitorId: number) => {
    const visitor = visitors.find(v => v.id === visitorId);
    if (visitor) {
      const updatedVisitor = { ...visitor, checkOut: new Date() };
      setVisitHistory(prev => [...prev, updatedVisitor]);
      setVisitors(prev => prev.filter(v => v.id !== visitorId));
      setAlert({ message: 'Visitor checked out successfully!', type: 'success' });
    }
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

  const formatDuration = (checkIn: Date, checkOut?: Date): string => {
    if (!checkOut) return 'In progress';
    const duration = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
    return `${duration} minutes`;
  };

  const VisitorCard: React.FC<{ visitor: Visitor }> = ({ visitor }) => {
    return (
      <div
        onClick={() => setSelectedVisitor(visitor)}
        className="bg-white w-full rounded-md p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{visitor.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${visitor.checkOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {visitor.checkOut ? 'Completed' : 'Checked In'}
          </span>
        </div>

        {visitor.company && (
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Building className="w-4 h-4" />
            <span>{visitor.company}</span>
          </div>
        )}
      </div>
    );
  };

  const VisitorDetailsModal: React.FC<{ visitor: Visitor; onClose: () => void }> = ({ visitor, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackbg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-4 hover:bg-[#e6fffa] px-2 rounded-md text-gray-400 hover:text-gray-700 text-xl">✕</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{visitor.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{visitor.phone}</span>
          </div>
          {visitor.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{visitor.email}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Host: {visitor.host}</span>
          </div>
          {visitor.department && (
            <div className="flex items-center gap-2">
              <span>Dept: {visitor.department}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span>Purpose: {visitor.purpose}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{visitor.checkIn.toLocaleString()}</span>
          </div>
          {visitor.checkOut && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Duration: {formatDuration(visitor.checkIn, visitor.checkOut)}</span>
            </div>
          )}
        </div>
        {visitor.notes && (
          <div className="border-t pt-4">
            <p className="text-gray-600"><strong>Notes:</strong> {visitor.notes}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br to-blue-800">
      <div className="mx-auto">
        {alert && (
          <div className={`mb-6 p-4 rounded-lg font-medium ${alert.type === 'success'
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
            {alert.message}
          </div>
        )}

        <div className="rounded-lg pb-10">
          <div className='grid py-4 px-6'>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit History</h2>

            <div className="flex items-center justify-between">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className='flex item-center ml-auto '>
                <div className="relative">
                  <div className="absolute inset-y-0 pb-2 mt-2 left-0 pl-3 flex items-center pointer-events-none ">
                    <svg className="h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    placeholder="Search Here..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="p-2 pl-10 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex  gap-4">
              {getFilteredHistory().length === 0 ? (
                <div className="text-center py-12 m-auto bg-white w-1/2 rounded-md">
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
        </div>

        {selectedVisitor && (
          <VisitorDetailsModal
            visitor={selectedVisitor}
            onClose={() => setSelectedVisitor(null)}
          />
        )}
      </div>
    </div>
  );
};

export default VisitorManagementSystem;
