import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footers from './components/Footers';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import PublicRoute from './components/PublicRoute';
import Createpost from './pages/Createpost';
import Updatepost from './pages/Updatepost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />

        {/* if no login  */}
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        {/* if login */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/?tab=posts" element={<Dashboard />} />
          <Route path="/dashboard/?tab=users" element={<Dashboard />} />
          <Route path="/dashboard/?tab=comments" element={<Dashboard />} />
          <Route path="/dashboard/?tab=dash" element={<Dashboard />} />
        </Route>
        {/* if admin and login */}
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/updatepost/:postId" element={<Updatepost />} />


        </Route>
      </Routes>
      <Footers />
    </BrowserRouter>
  )
}

export default App