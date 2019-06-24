import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Mymusic extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
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
        return (
            <div>
                <button className="newPostButton" onClick={this.handleClickOpen}><b>發文</b></button>
                <div className="article-list-container">{list}</div>
            </div>
        );
    }
}
