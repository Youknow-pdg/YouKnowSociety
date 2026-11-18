/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Subsidiaries from './pages/Subsidiaries';
import CaseStudies from './pages/CaseStudies';
import Events from './pages/Events';
import WebinarRoom from './pages/WebinarRoom';
import AcademyLive from './pages/AcademyLive';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Community from './pages/Community';
import Forum from './pages/Forum';
import Admin from './pages/Admin';
import Applications from './pages/Applications';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === '/join-form' || hash === '#join-form') {
      setTimeout(() => {
        const elem = document.getElementById('join-form');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 150);
    } else if (hash) {
      setTimeout(() => {
        const elem = document.getElementById(hash.replace('#', ''));
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/webinar/:id" element={<WebinarRoom />} />
        <Route path="/academy/live" element={<AcademyLive />} />
        <Route path="/academy/webinaire" element={<AcademyLive />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/subsidiaries" element={<Subsidiaries />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/community" element={<Community />} />
              <Route path="/join-form" element={<Community />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/apps" element={<Applications />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cases" element={<CaseStudies />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
}
