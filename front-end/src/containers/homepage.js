import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Button from '@material-ui/core/Button';
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
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Convertion from './convertion';
import Download from './download';
import Mymusic from './mymusic';
import MymusicDetail from './mymusic_detail';
import Home from './home';
import Profile from './profile';
import '../styles/homepage.css';
import '../styles/drawer.css';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        const username = localStorage.getItem('name');
        this.state = { open: false, fabOpen: false, user: username };
    }

    toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ open: open });
    }

    sideList = (
        <div
          style={{ width: '14vw', minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#ffffff' }}
          role="presentation"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
        >
          <List style={{ backgroundColor: 'rgba(96, 96, 96, 0.4)' }}>
            <NavLink to="/home" className="drawer_link">
              <ListItem button>
                    <ListItemIcon style={{ color: '#ffffff' }}><HomeIcon /></ListItemIcon>
                    <ListItemText primary="首頁"/>
              </ListItem>
            </NavLink>
            <NavLink to="/convertion" className="drawer_link">
              <ListItem button>
                <ListItemIcon style={{ color: '#ffffff' }}><MusicIcon /></ListItemIcon>
                <ListItemText primary="進行轉譜"/>
              </ListItem>
            </NavLink>
            <NavLink to="/mymusic" className="drawer_link">
              <ListItem button>
                <ListItemIcon style={{ color: '#ffffff' }}><DataIcon /></ListItemIcon>
                <ListItemText primary="我的音樂庫"/>
              </ListItem>
            </NavLink>
            <NavLink to="/download" className="drawer_link">
              <ListItem button>
                <ListItemIcon style={{ color: '#ffffff' }}><DownloadIcon /></ListItemIcon>
                <ListItemText primary="下載專區"/>
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List style={{ backgroundColor: 'rgba(96, 96, 96, 0.4)' }}>
            <NavLink to="/profile" className="drawer_link">
              <ListItem button>
                <ListItemIcon style={{ color: '#ffffff' }}><PersonIcon /></ListItemIcon>
                <ListItemText primary="個人檔案"/>
              </ListItem>
            </NavLink>
            <NavLink to="/login" className="drawer_link">
              <ListItem button onClick={this.props.logout}>
                <ListItemIcon style={{ color: '#ffffff' }}><LogoutIcon /></ListItemIcon>
                <ListItemText primary="登出"/>
              </ListItem>
            </NavLink>
          </List>
        </div>
    )

    handleToggle = () => {
        this.setState({ fabOpen: true });
      }
    
    handleClose = () => {
        this.setState({ fabOpen: false });
      }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className="bg-container">
                <div style={{ position: 'relative' }}>
                    <header>
                        <div className="homepage-header">
                            <div className="homepage-menu">
                                <IconButton style={{ marginBottom: '2vh' }}
                                    color="inherit"
                                    onClick={this.toggleDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
                                    {this.sideList}
                                </Drawer>
                            </div>
                            <div className="homepage-title">
                                <h1 style={{ marginLeft: '2vw' }}><NavLink className="nav_title" to="/home">Online Music Convertion</NavLink></h1>
                            </div>
                            <div className="homepage-fab">
                                <Fab onClick={this.handleToggle}
                                    style={{ maxHeight: '50px', maxWidth: '50px', top: '1.5vh', marginLeft: '15vw' }}
                                    color="primary"
                                    className="fab_button"><PersonIcon />
                                </Fab>
                                <Dialog className="fab-dialog" open={this.state.fabOpen} onClose={this.handleClose}>
                                    <DialogTitle id="fab-menu">您好，{this.state.user}！</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">取消</Button>
                                        <Button onClick={this.props.logout} color="primary">登出</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </header>
                    <section className="homepage-section">
                        <Switch>
                            <Route path="/download" component={Download} />
                            <Route exact path="/mymusic" component={Mymusic} />
                            <Route path="/mymusic/:id?" component={MymusicDetail} />
                            <Route path="/convertion" component={Convertion} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/" component={Home} />
                            <Route path="/home" component={Home} />
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
