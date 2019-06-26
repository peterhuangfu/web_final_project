import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../styles/mymusic.css';

export default class Mymusic extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [{id: '1', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '2', img: 'http://i.imgur.com/Dqef6.jpg', title: 'Two', author: 'Aaron'},
            {id: '3', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '4', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '5', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '6', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '7', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '8', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'},
            {id: '9', img: 'http://i.imgur.com/Dqef6.jpg', title: 'One', author: 'Peter'}
        ] };
    }
    componentDidMount() {
        // this.getAllMusic();
        window.scrollTo(0,0);
    }

    getAllMusic = async () => {
        await fetch('http://localhost:3002/api/getArticle')
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success)
                this.setState(() => ({ data: originData.data }));
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
    }

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
                    {this.state.data.map((data, i) => (
                    <GridListTile key={i} style={{ width: '25vw', height: '40vh', padding: '1em' }}>
                        <div className="hover-screen">
                            <NavLink to={"/mymusic/" + data.id}>
                                <img src={data.img} alt={data.title} style={{ maxWidth: '25vw', height: '75%' }}/>
                                <GridListTileBar
                                style={{ height: '25%' }}
                                title={data.title}
                                subtitle={<span>by {data.author}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${data.title}`} style={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                                />
                            </NavLink>
                        </div>
                    </GridListTile>
                    ))}
                </GridList>
            </div>
        ) : (
            <div>
                <span style={{ color: '#ffffff' }}><b>You have not posted anything yet !</b></span>
            </div>
        );
    }
}
