import React, { Component, Fragment } from 'react';
import avatar from '../../../public/images/avatar.jpg';
import avatar1 from '../../../public/images/avatar1.jpg';
import avatar2 from '../../../public/images/avatar2.jpg';
import medal from '../../../public/images/medal.png';
import profileSearch from '../../../public/images/search.png';
import facebook from '../../../public/images/facebook-logo-button.svg';
import twitter from '../../../public/images/twitter-logo-button.svg';
import userProfile from '../../../mockdata/userProfile';
import UserArticles from './UserArticles';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: userProfile };
  }

  render() {
    const { user } = this.state;
    const { articles } = user.userProfile;
    // console.log(articles);
    const firstName = user.userProfile.fullName.split(' ')[0];

    return (
      <Fragment>
        <div className="site-content">
          <div className="profile-header">
            <div className="text-center header-img" />
            <div className="user-info">
              <div className="row">
                <div className="col-lg-3 col-xl-2 d-none d-lg-inline p-0">
                  <div className="d-flex align-items-center h-100">
                    <div className="author-card-wrapper mx-3 w-100 h-100">
                      <div className="h-100 p-5 bg-light-grey">
                        <div className="card author-card text-center h-100 white">
                          <div className="card-body d-flex align-items-center">
                            <div className="w-100">
                              <p className="card-title text-uppercase">Author</p>
                              <div className="ratings">
                                <ul className="list-inline">
                                  <li className="list-inline-item"><i className="fas fa-star" /></li>
                                  <li className="list-inline-item"><i className="fas fa-star" /></li>
                                  <li className="list-inline-item"><i className="fas fa-star" /></li>
                                  <li className="list-inline-item"><i className="fas fa-star" /></li>
                                  <li className="list-inline-item"><i className="fas fa-star" /></li>
                                </ul>
                                <img className="img-fluid author-medal" src={medal} alt="medal" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-8 p-0">
                  <div className="card user-bio">
                    <div className="card-body bg-light-grey">
                      <p className="user-name">{user.userProfile.fullName}</p>
                      <p className="bio-title">Bio</p>
                      <p className="card-text about-me">{user.userProfile.bio}</p>
                    </div>
                    <div className="card-footer">
                      <div className="contact-info float-left">
                        <p className="contact-title">Contact Info</p>
                        <p className="user-email">
                          email:&nbsp;
                          { user.userProfile.email}
                        </p>
                      </div>
                      <div className="social-links float-right d-flex align-items-center">
                        <img className="img-fluid" src={facebook} alt="facebook" />
                        <img className="img-fluid" src={twitter} alt="twitter" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xl-2 d-none d-lg-inline p-0">
                  <div className="d-flex align-items-center mx-3 h-100 bg-light-grey">
                    <div className="settings p-3 align-self-center">
                      <div className="toggle">
                        <label htmlFor="checkbox" className="switch">
                          <input type="checkbox" />
                          <span className="slider round" />
                        </label>
                        <span className="text-uppercase">&nbsp;&nbsp;Follow</span>
                      </div>
                      <div className="toggle">
                        <label htmlFor="checkbox" className="switch">
                          <input type="checkbox" />
                          <span className="slider round" />
                        </label>
                        <span className="text-uppercase">&nbsp;&nbsp;Notifications</span>
                      </div>
                      <div className="toggle">
                        <label htmlFor="checkbox" className="switch">
                          <input type="checkbox" />
                          <span className="slider round" />
                        </label>
                        <span className="text-uppercase">&nbsp;&nbsp;Private</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center user-avatar-container">
                <img className="user-avatar img-fluid" src={avatar} alt="user" />
              </div>
            </div>
          </div>
          <div className="profile-body">
            <div className="collapse" id="collapseSearch">
              <div className="">
                <form>
                  <div className="profile-search-form">
                    <input type="email" className="form-control form-control-lg" id="search" aria-describedby="searchForm" placeholder="Search..." />
                  </div>
                </form>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-sm-12 col-lg-10">
                <nav className="d-inline">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                      Recent
                    </a>
                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Bookmarks</a>
                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">
                      Stats
                    </a>
                    <a className="nav-item nav-link ml-auto profile-search" data-toggle="collapse" href="#collapseSearch" role="button" aria-expanded="false" aria-controls="collapseSearch">
                      <img src={profileSearch} alt="profile search" />
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div className="p-3 tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-recent-tab">

                    {/* component for articles a user has published */}
                    <UserArticles articles={articles} firstName={firstName} />

                  </div>
                  <div className="p-3 tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-bookmarks-tab">...</div>
                  <div className="p-3 tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-stats-tab">...</div>
                </div>
              </div>
              <div className="col-lg-2 d-none d-lg-inline">
                <div className="followers">
                  <p className="my-2 text-center">
                    Followers (
                    {user.userProfile.followers}
                    )
                  </p>
                  <div className="follower-list mt-3">
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar1} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar2} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar2} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar2} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <a className="btn btn-primary mt-3" href="/" role="button">View More</a>
                    </div>
                  </div>
                </div>

                <div className="mt-5 following">
                  <p className="my-2 text-center">
                    Following (
                    {user.userProfile.following}
                  )
                  </p>
                  <div className="following-list mt-3">
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar1} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar2} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar2} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="media follower-info">
                      <img className="align-self-center mr-3 follower-avatar img-fluid" src={avatar2} alt="" />
                      <div className="media-body align-self-center">
                        <p className="m-0">Chad Moss</p>
                        <p className="m-0">Graphics Designer</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <a className="btn btn-primary mt-3" href="/" role="button">View More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProfilePage;
