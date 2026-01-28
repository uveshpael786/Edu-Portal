import React, { useState } from 'react';
import { Camera, BookOpen, Bell, Upload, FileText, AlertCircle, TrendingUp, LogOut, X, Eye, EyeOff, Users, Shield } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    name: '',
    branch: '',
    semester: '',
    course: '',
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [notes, setNotes] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [backlogs, setBacklogs] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [activeSlot, setActiveSlot] = useState(null);
  const [currentSection, setCurrentSection] = useState('user'); // 'user' or 'admin'

  const isAdmin = currentUser?.email === 'admin432@gmail.com';

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setLoginData({ ...loginData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    if (loginData.email === 'admin432@gmail.com' && loginData.password === '@admin...') {
      setCurrentUser({ email: loginData.email, isAdmin: true, name: 'Admin', photo: photoPreview });
      setCurrentPage('dashboard');
      setCurrentSection('admin');
    } else if (loginData.email && loginData.password) {
      if (loginData.email !== 'admin432@gmail.com' && (!loginData.name || !loginData.branch || !loginData.semester || !loginData.course)) {
        alert('Please fill in all fields');
        return;
      }
      const newUser = { ...loginData };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setCurrentPage('dashboard');
      setCurrentSection('user');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setLoginData({
      email: '',
      password: '',
      name: '',
      branch: '',
      semester: '',
      course: '',
      photo: null
    });
    setPhotoPreview(null);
  };

  const slots = [
    { id: 1, name: 'LMS - Notes', icon: BookOpen, color: 'from-blue-500 to-cyan-500', data: notes, setData: setNotes },
    { id: 2, name: 'Announcements', icon: Bell, color: 'from-purple-500 to-pink-500', data: announcements, setData: setAnnouncements },
    { id: 3, name: 'Assignments', icon: Upload, color: 'from-orange-500 to-red-500', data: assignments, setData: setAssignments },
    { id: 4, name: 'Notifications', icon: AlertCircle, color: 'from-green-500 to-emerald-500', data: notifications, setData: setNotifications },
    { id: 5, name: 'Previous Papers', icon: FileText, color: 'from-indigo-500 to-blue-500', data: pyqs, setData: setPyqs },
    { id: 6, name: 'Backlog Questions', icon: AlertCircle, color: 'from-yellow-500 to-orange-500', data: backlogs, setData: setBacklogs },
    { id: 7, name: 'Predicted Questions', icon: TrendingUp, color: 'from-pink-500 to-rose-500', data: predictions, setData: setPredictions }
  ];

  const adminSlot = {
    id: 8,
    name: 'Admin Panel',
    icon: Shield,
    color: 'from-red-500 to-orange-500'
  };

  const SlotCard = ({ slot, index, isUserMode }) => {
    const isActive = activeSlot === slot.id;
    const Icon = slot.icon;
    
    return (
      <div
        onClick={() => setActiveSlot(isActive ? null : slot.id)}
        className={`relative cursor-pointer transition-all duration-500 ease-out ${
          isActive ? 'col-span-2 row-span-2 z-20' : 'col-span-1 row-span-1 hover:scale-105'
        }`}
        style={{
          animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.2}s`
        }}
      >
        <div className={`h-full rounded-2xl bg-gradient-to-br ${slot.color} p-6 shadow-2xl transform perspective-1000 ${
          isActive ? 'rotate-0' : 'hover:rotate-y-12'
        }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 text-white" />
              {isActive && (
                <X className="w-6 h-6 text-white cursor-pointer" onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlot(null);
                }} />
              )}
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{slot.name}</h3>
            <div className="text-white/80 text-sm mb-4">
              {slot.data?.length || 0} items
            </div>
            
            {isActive && (
              <div className="flex-1 overflow-y-auto bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                {isUserMode ? (
                  <UserSlotContent data={slot.data} slotName={slot.name} />
                ) : (
                  <AdminSlotContent slot={slot} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AdminPanelCard = ({ slot, index }) => {
    const isActive = activeSlot === slot.id;
    const Icon = slot.icon;
    
    return (
      <div
        onClick={() => setActiveSlot(isActive ? null : slot.id)}
        className={`relative cursor-pointer transition-all duration-500 ease-out ${
          isActive ? 'col-span-2 row-span-2 z-20' : 'col-span-1 row-span-1 hover:scale-105'
        }`}
        style={{
          animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
          animationDelay: `${index * 0.2}s`
        }}
      >
        <div className={`h-full rounded-2xl bg-gradient-to-br ${slot.color} p-6 shadow-2xl transform perspective-1000 ${
          isActive ? 'rotate-0' : 'hover:rotate-y-12'
        }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 text-white" />
              {isActive && (
                <X className="w-6 h-6 text-white cursor-pointer" onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlot(null);
                }} />
              )}
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{slot.name}</h3>
            <div className="text-white/80 text-sm mb-4">
              Control Center
            </div>
            
            {isActive && (
              <div className="flex-1 overflow-y-auto bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <AdminPanelContent />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AdminPanelContent = () => {
    const totalContent = notes.length + announcements.length + assignments.length + 
                        notifications.length + pyqs.length + backlogs.length + predictions.length;
    
    return (
      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 text-lg">System Overview</h4>
          <div className="space-y-2 text-white/80">
            <div className="flex justify-between">
              <span>Total Content:</span>
              <span className="font-bold">{totalContent}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Users:</span>
              <span className="font-bold">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Modules:</span>
              <span className="font-bold">7</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Content Distribution</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/80">
              <span>📚 LMS Notes:</span>
              <span className="font-semibold">{notes.length}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>🔔 Announcements:</span>
              <span className="font-semibold">{announcements.length}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>📤 Assignments:</span>
              <span className="font-semibold">{assignments.length}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>⚠️ Notifications:</span>
              <span className="font-semibold">{notifications.length}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>📄 Previous Papers:</span>
              <span className="font-semibold">{pyqs.length}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>⚠️ Backlogs:</span>
              <span className="font-semibold">{backlogs.length}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>📈 Predictions:</span>
              <span className="font-semibold">{predictions.length}</span>
            </div>
          </div>
        </div>

        {users.length > 0 && (
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Recent Users</h4>
            <div className="space-y-3">
              {users.slice(-3).reverse().map((user, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/10 rounded-lg p-2">
                  {user.photo && (
                    <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                  )}
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{user.name}</div>
                    <div className="text-white/60 text-xs">{user.branch} - Sem {user.semester}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const AdminSlotContent = ({ slot }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });

    const handleSubmit = (e) => {
      e.stopPropagation();
      if (!formData.title) return;
      
      const newItem = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        date: new Date().toLocaleDateString(),
        logo: getAutoLogo(formData.title)
      };

      slot.setData([...slot.data, newItem]);
      setFormData({ title: '', content: '' });
    };

    const handleDelete = (e, itemId) => {
      e.stopPropagation();
      slot.setData(slot.data.filter(item => item.id !== itemId));
    };

    return (
      <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-3">Add New Content</h4>
          <input
            type="text"
            placeholder="Title (e.g., C Programming Notes)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/60 border border-white/40 mb-3"
          />
          <textarea
            placeholder="Content/Description"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/60 border border-white/40 h-24 mb-3"
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold hover:bg-white/90 transition-all"
          >
            Add to {slot.name}
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-semibold">Existing Content ({slot.data.length})</h4>
          {slot.data.length === 0 ? (
            <div className="text-white/60 text-center py-4">No content added yet</div>
          ) : (
            slot.data.map((item) => (
              <div key={item.id} className="bg-white/30 rounded-lg p-4 backdrop-blur-sm hover:bg-white/40 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/40 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {item.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-white font-semibold">{item.title}</h5>
                    <p className="text-white/80 text-sm mt-1">{item.content}</p>
                    <span className="text-white/60 text-xs mt-2 block">{item.date}</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="text-white/60 hover:text-red-300 transition-all flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const UserSlotContent = ({ data, slotName }) => {
    if (!data || data.length === 0) {
      return <div className="text-white/80 text-center py-8">No {slotName.toLowerCase()} available</div>;
    }

    return (
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white/30 rounded-lg p-4 backdrop-blur-sm hover:bg-white/40 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/40 flex items-center justify-center text-2xl font-bold">
                {item.logo}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-white/80 text-sm mt-1">{item.content}</p>
                <span className="text-white/60 text-xs mt-2 block">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getAutoLogo = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('c programming') || lower.includes('c notes') || lower.includes(' c ')) return '🅲';
    if (lower.includes('java')) return '☕';
    if (lower.includes('python')) return '🐍';
    if (lower.includes('javascript') || lower.includes('js')) return '📜';
    if (lower.includes('data structure') || lower.includes('dsa')) return '🌳';
    if (lower.includes('database') || lower.includes('sql')) return '🗄️';
    if (lower.includes('web')) return '🌐';
    if (lower.includes('math')) return '📐';
    if (lower.includes('physics')) return '⚛️';
    if (lower.includes('chemistry')) return '🧪';
    return '📚';
  };

  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">EduPortal 3D</h1>
            <p className="text-white/80">Modern Learning Management System</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-10 h-10 text-white/60" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-all">
                  <Camera className="w-4 h-4 text-gray-700" />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60"
            />
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-all"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {loginData.email !== 'admin432@gmail.com' && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={loginData.name}
                  onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60"
                />
                
                <select
                  value={loginData.branch}
                  onChange={(e) => setLoginData({ ...loginData, branch: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:border-white/60"
                >
                  <option value="" className="text-gray-800">Select Branch</option>
                  <option value="CSE" className="text-gray-800">Computer Science</option>
                  <option value="ECE" className="text-gray-800">Electronics</option>
                  <option value="ME" className="text-gray-800">Mechanical</option>
                  <option value="CE" className="text-gray-800">Civil</option>
                  <option value="EE" className="text-gray-800">Electrical</option>
                </select>

                <select
                  value={loginData.semester}
                  onChange={(e) => setLoginData({ ...loginData, semester: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:border-white/60"
                >
                  <option value="" className="text-gray-800">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem} className="text-gray-800">Semester {sem}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Course (e.g., B.Tech, MCA)"
                  value={loginData.course}
                  onChange={(e) => setLoginData({ ...loginData, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60"
                />
              </>
            )}

            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 rounded-xl bg-white text-purple-600 font-bold hover:bg-white/90 transition-all transform hover:scale-105"
            >
              {loginData.email === 'admin432@gmail.com' ? 'Admin Login' : 'Create Profile & Login'}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotateZ(0deg); }
            50% { transform: translateY(-20px) rotateZ(2deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {currentUser?.photo && (
                <img src={currentUser.photo} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white/30" />
              )}
              <div>
                <h2 className="text-white font-bold">{currentUser?.name}</h2>
                <p className="text-white/60 text-sm">
                  {isAdmin ? 'Administrator' : `${currentUser?.branch} - Sem ${currentUser?.semester}`}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Section Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCurrentSection('user');
                setActiveSlot(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentSection === 'user'
                  ? 'bg-white text-purple-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Users className="w-5 h-5" />
              User Section
            </button>
            <button
              onClick={() => {
                setCurrentSection('admin');
                setActiveSlot(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentSection === 'admin'
                  ? 'bg-white text-purple-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Shield className="w-5 h-5" />
              Admin Section
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {currentSection === 'user' ? 'User Dashboard' : 'Admin Dashboard'}
          </h1>
          <p className="text-white/70">
            {currentSection === 'user' 
              ? 'Access your learning resources' 
              : 'Manage all content and modules'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {currentSection === 'user' ? (
            slots.map((slot, index) => (
              <SlotCard key={slot.id} slot={slot} index={index} isUserMode={true} />
            ))
          ) : (
            <>
              {slots.map((slot, index) => (
                <SlotCard key={slot.id} slot={slot} index={index} isUserMode={false} />
              ))}
              <AdminPanelCard slot={adminSlot} index={7} />
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-y-12:hover {
          transform: rotateY(12deg);
        }
      `}</style>
    </div>
  );
};

export default App;
