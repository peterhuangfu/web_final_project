import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

export default class Mymusic extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [{img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'Two', author: 'Aaron'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'}
        ] };
    }
    componentDidMount() {
        // this.getArticleID();
        window.scrollTo(0,0);
    }

    // getArticleID = async () => {
    //     await fetch('http://localhost:3001/api/getArticle')
    //     .then(res => { return res.json() })
    //     .then(originData => {
    //         if(originData.success)
    //             this.setState(() => ({ data: originData.data }));
    //         else
    //             alert('Fail.');
    //     })
    //     .catch((err) => console.error(err));
    // }

    // checkPass = async () => {
    //     await fetch('http://localhost:3001/api/getPassword')
    //     .then(res => { return res.json() })
    //     .then(res => {
    //         if(res.success) {
    //             if(this.state.password === res.data[0].password)
    //                 this.props.history.push('/postArticle');
    //             else
    //                 alert('Wrong Password.');
    //         }
    //         else
    //             alert('Wrong Password.');
    //     })
    //     .catch((err) => console.error(err));
    //     this.setState({ password: '' });
    // }

    // passInput = e => {
    //     if(e.key === 'Enter') 
    //         this.checkPass();
    //     else
    //         this.setState({ password: e.target.value });
    // }

    render() {
        const style = { float: 'right', color: '#ffffff' };
        const list = this.state.data.map((e, i) => (
            <div key={i} className="article-item">
                <span>&nbsp;&nbsp;</span><NavLink className="nav_a" to={"/articles/" + e.id}><b>【{e.title}】</b></NavLink>
                <span style={style}>轉譜時間：{e.time}</span>
            </div>
        ));
        return list.length ? (
            <div>
                <GridList cellHeight={180} className="grid-list">
                    {this.state.data.map(data => (
                    <GridListTile key={data.img} style={{ width: '25vw', height: '40vh', padding: '1em'}}>
                        <img src={data.img} alt={data.title} />
                        <GridListTileBar
                        title={data.title}
                        subtitle={<span>by: {data.author}</span>}
                        actionIcon={
                            <IconButton aria-label={`info about ${data.title}`} style={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                <InfoIcon />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
                {/* <button className="newPostButton" onClick={this.handleClickOpen}><b>上傳</b></button>
                <div className="article-list-container">{list}</div> */}
            </div>
        ) : (
            <div>
                <span style={{ color: '#ffffff' }}><b>You have not posted anything yet !</b></span>
            </div>
        );
    }
}
