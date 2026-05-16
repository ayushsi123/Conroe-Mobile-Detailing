import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Calendar, 
  Settings, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MoreHorizontal,
  Trash2,
  Phone,
  Mail,
  User as UserIcon
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/admin/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: newStatus
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'confirmed': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case 'completed': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0 text-slate-900">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-500">Managing bookings for Conroe Mobile Detailing.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <div className="font-bold">{user?.email?.split('@')[0]}</div>
                <div className="text-slate-400 text-xs">Admin</div>
              </div>
            </div>
            <Button variant="outline" size="icon" className="rounded-xl border-slate-200" onClick={handleLogout}>
              <LogOut size={18} />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: <Calendar className="text-blue-600" />, color: 'bg-blue-50' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: <Clock className="text-yellow-600" />, color: 'bg-yellow-50' },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: <CheckCircle className="text-green-600" />, color: 'bg-green-50' },
            { label: 'Total Revenue', value: `$${bookings.reduce((sum, b) => b.status === 'completed' ? sum + b.totalPrice : sum, 0)}`, icon: <BarChart3 className="text-purple-600" />, color: 'bg-purple-50' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-400">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-100">
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">All Bookings</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-slate-100">Pending</TabsTrigger>
              <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-slate-100">Active</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-slate-100">History</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
               <Button variant="outline" className="rounded-xl border-slate-200">Export CSV</Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card className="border-none shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <Calendar size={48} className="mb-4 opacity-20" />
                          <p>No bookings found yet.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold flex items-center"><UserIcon size={14} className="mr-2 text-slate-400" /> {booking.customerName}</span>
                            <span className="text-xs text-slate-500 mt-1 flex items-center"><Phone size={10} className="mr-1" /> {booking.customerPhone}</span>
                            <span className="text-xs text-slate-500 flex items-center"><Mail size={10} className="mr-1" /> {booking.customerEmail}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-slate-700">{booking.serviceName}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-bold">{booking.date}</div>
                            <div className="text-slate-500">{booking.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(booking.status)}
                        </TableCell>
                        <TableCell className="font-bold">
                          ${booking.totalPrice}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreHorizontal size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl p-2 w-48">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1.5">Change Status</div>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'confirmed')} className="rounded-lg">
                                <CheckCircle size={14} className="mr-2 text-blue-600" /> Confirm
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'completed')} className="rounded-lg">
                                <CheckCircle size={14} className="mr-2 text-green-600" /> Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'cancelled')} className="rounded-lg">
                                <XCircle size={14} className="mr-2 text-red-600" /> Cancel
                              </DropdownMenuItem>
                              <div className="h-px bg-slate-100 my-1" />
                              <DropdownMenuItem onClick={() => handleDelete(booking.id)} className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 size={14} className="mr-2" /> Delete Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
             {/* Similar to all but filtered - skipping for brevity in implementation but it shows the pattern */}
             <div className="bg-white p-20 rounded-3xl text-center text-slate-400 border border-dashed border-slate-200">
               Filtered view for Pending items would go here.
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
