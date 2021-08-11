import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { Footer, MenuAsideLeft, Navbar } from '../../components';
import { StylingMainContent } from './StyledPrivateRoute';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem('isAuth');
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');
  // const token = localStorage.getItem('token');
  // const dispatch = useDispatch();
  // action user dari db ke redux
  const location = useLocation();

  // START = LOGIC FOR ASIDE MENU ACTIVE
  const pathNow = location.pathname;
  const listMenu = {
    [`/${username}/dashboard`]: 'dashboard',
    [`/${username}/history`]: 'dashboard',
    [`/${username}/search-receiver`]: 'transfer',
    [`/${username}/search-receiver/to-username`]: 'transfer',
    [`/${username}/status-transfer`]: 'transfer',
    [`/${username}/search-receiver/to-username/confirmation`]: 'transfer',
    [`/${username}/topup`]: 'topup',
    [`/${username}/profile`]: 'profile',
    [`/${username}/profile/info`]: 'profile',
    [`/${username}/profile/password`]: 'profile',
    [`/${username}/profile/change-pin`]: 'profile',
    [`/${username}/profile/add-phone-number`]: 'profile',
  };
  // console.log(listMenu);
  // END = LOGIC FOR ASIDE MENU ACTIVE
  // console.log(location);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === 'true' && role === 'MEMBER') {
          return (
            <>
              <Navbar />
              <StylingMainContent>
                <MenuAsideLeft active={listMenu[pathNow]} username={username} />
                {/* Styling for this element (Main, Header-setion) inside StylingMainContent component */}
                <div className="main">
                  <Component {...props} />
                </div>
              </StylingMainContent>
              <Footer />
            </>
          );
        } else if (isAuth === 'true' && role === 'ADMIN') {
          return (
            <>
              <Navbar />
              <StylingMainContent>
                <MenuAsideLeft active={listMenu[pathNow]} username={username} />
                {/* Styling for this element (Main, Header-setion) inside StylingMainContent component */}
                <div className="main">
                  <Component {...props} />
                </div>
              </StylingMainContent>
              <Footer />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
