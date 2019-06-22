import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Articles from "./articles";
import ArticleDetail from "./article_detail";
import UpdateArticle from "./update_article";
import PostArticle from "./post_article";
import UpdateProfile from "./update_profile";
import Home from './home';
import Profile from './profile';
import './blog.css';

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    }
    
    handleDrawerClose = () => {
        this.setState({ open: false });
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        const clear = { clear: 'both' };
        return (
            <div className="bg-container">
                <Drawer   
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}>
                    <div>
                        <IconButton onClick={this.handleDrawerClose} style={{ float: 'right' }}>
                            {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                    {['首頁', '進行轉譜', '轉換規則', '我的樂譜'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['個人檔案', '聯絡我們', '登出'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                <div style={{ position: 'relative' }}>
                    <header>
                        <div className="homepage-header">
                            <div className="homepage-title">
                                <IconButton style={{ display: 'inline-block', marginBottom: '2vh' }}
                                    color="inherit"
                                    onClick={this.handleDrawerOpen}>
                                    <MenuIcon />
                                </IconButton>
                                <h1 style={{ display: 'inline-block', marginLeft: '2vw' }}><NavLink className="nav_title" to="/home">音樂轉檔 Wav To Notes</NavLink></h1>
                                </div>
                            <div className="nav_container">
                                <div className="homepage-nav">
                                    <button id="nav_link_butt1" className="nav_link_butt"><NavLink className="nav_link" to="/home"><b>首頁</b></NavLink></button>
                                    <button id="nav_link_butt2" className="nav_link_butt"><NavLink className="nav_link" to="/articles"><b>文章列表</b></NavLink></button>
                                    <button id="nav_link_butt3" className="nav_link_butt"><NavLink className="nav_link" to="/profile"><b>個人資訊</b></NavLink></button>
                                    <hr className="nav_hr" />
                                </div>
                                <div style={clear}></div>
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
