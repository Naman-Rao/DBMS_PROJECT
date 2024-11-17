import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Header from './components/Header';
import CloudResourceManagement from './components/CloudResourceManagement';
import Login from './components/Login';
import './App.css';
import AdmHub from './components/login-succ/Admin/AdmHub';
import AdmHeader from './components/login-succ/Admin/AdmHeader';
import Account from './components/login-succ/Admin/account';
import Billing from './components/login-succ/Admin/Billing';
import JobScheduler from './components/login-succ/Admin/JobScheduler';
import Service from './components/login-succ/Admin/Service';
import Cluster from './components/login-succ/Admin/Cluster';
import Logs from './components/login-succ/Admin/Logs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path="/about" element={<Header />} />
        <Route path="/features" element={<Header />} />
        <Route path="/pricing" element={<Header/>} />
        <Route path="/support" element={<Header/>} />
        <Route path="/contact" element={<Header/>} />
        <Route path="/login" element={<Header />} />
        <Route path="/admhub" element={<AdmHeader />} />
        <Route path="/admhub/account" element={<AdmHeader />} />
        <Route path='/admhub/Billing' element={<AdmHeader/>}/>
        <Route path='/admhub/JobScheduler' element={<AdmHeader/>}/>
        <Route path='/admhub/Service' element={<AdmHeader/>}/>
        <Route path='/admhub/Cluster' element={<AdmHeader/>}/>
        <Route path='/admhub/Logs' element={<AdmHeader/>}/>
        
        

      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admhub" element={<AdmHub />} />
        <Route path='/admhub/account' element={<Account/>}/>
        <Route path='/admhub/Billing' element={<Billing/>}/>
        <Route path='/admhub/JobScheduler' element={<JobScheduler/>}/>
        <Route path='/admhub/Service' element={<Service/>}/>
        <Route path='/admhub/Cluster' element={<Cluster/>}/>
        <Route path='/admhub/Logs' element={<Logs/>}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
