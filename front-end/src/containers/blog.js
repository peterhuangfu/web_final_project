import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import DownloadIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MusicIcon from '@material-ui/icons/QueueMusic';
import DataIcon from '@material-ui/icons/Receipt';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@material-ui/icons/ArrowForward';

import Articles from "./articles";
import ArticleDetail from "./article_detail";
import UpdateArticle from "./update_article";
import PostArticle from "./post_article";
import UpdateProfile from "./update_profile";
import Home from './home';
import Profile from './profile';
import './blog.css';
import './drawer.css';

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ open: open });
    };

    sideList = (
        <div
          style={{ width: '15vw' }}
          role="presentation"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
        >
          <List>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="首頁"/>
              </ListItem>
            </NavLink>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                <ListItemIcon><MusicIcon /></ListItemIcon>
                <ListItemText primary="進行轉譜"/>
              </ListItem>
            </NavLink>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                <ListItemIcon><DataIcon /></ListItemIcon>
                <ListItemText primary="我的音樂庫"/>
              </ListItem>
            </NavLink>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                <ListItemIcon><DownloadIcon /></ListItemIcon>
                <ListItemText primary="下載專區"/>
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="個人檔案"/>
              </ListItem>
            </NavLink>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="登出"/>
              </ListItem>
            </NavLink>
          </List>
        </div>
    );

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        const clear = { clear: 'both' };
        return (
            <div className="bg-container">
                <div style={{ position: 'relative' }}>
                    <header>
                        <div className="homepage-header">
                            <div className="homepage-title">
                                <IconButton style={{ display: 'inline-block', marginBottom: '2vh' }}
                                    color="inherit"
                                    onClick={this.toggleDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
                                    {this.sideList}
                                </Drawer>
                                <h1 style={{ display: 'inline-block', marginLeft: '2vw' }}><NavLink className="nav_title" to="/home">Music Convertion</NavLink></h1>
                            </div>
                        </div>
                    </header>
                    <section className="homepage-section">
                        <Switch>
                            <Route exact path="/articles" component={Articles} />
                            <Route path="/articles/:id?" component={ArticleDetail} />
                            <Route path="/updateArticle/:id?" component={UpdateArticle} />
                            <Route path="/postArticle" component={PostArticle} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/updateProfile" component={UpdateProfile} />
                            <Route path="/" component={Home} />
                            <Route path="/home" component={Home} />
                            <Redirect from="/home" to="/" />
                        </Switch>
                    </section>
                    <footer className="homepage-footer">
                        copyright@ 盧盧專題小組
                    </footer>
                </div>
            </div>
        );
    }
}
