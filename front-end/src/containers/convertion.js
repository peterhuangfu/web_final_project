import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Convertion extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        const style = { float: 'right', color: '#ffffff' };
        const list = this.state.data.map((e, i) => (
            <div key={i} className="music-item">
                <span>&nbsp;&nbsp;</span><NavLink className="nav_a" to={"/mymusic/" + e.id}><b>【{e.title}】</b></NavLink>
                <span style={style}>轉譜時間：{e.time}</span>
            </div>
        ));
        return list.length ? (
            <div>
                <button className="newPostButton" onClick={this.handleClickOpen}><b>上傳</b></button>
                <div className="music-list-container">{list}</div>
            </div>
        ) : (
            <div>
                <span style={{ color: '#ffffff' }}><b>You have not posted anything yet !</b></span>
            </div>
        );
    }
}
