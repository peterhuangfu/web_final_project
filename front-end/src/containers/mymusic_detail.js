import React, { Component } from "react";
import Post from "../components/post";
import '../styles/mymusic_detail.css';

export default class MymusicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        let url = 'http://localhost:3002/api/getFile/' + id;
        console.log(url);
        fetch(url)
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success)
                this.setState(() => ({ data: originData.data }));
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
        window.scrollTo(0,0);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { id } = this.props.match.params;
        return this.state.data ? (
            <div>
                <div className="music-itself">
                    <Post id={id} title={this.state.data.file_title} source="http://i.imgur.com/Dqef6.jpg" author={this.state.data.user_name} content={this.state.data.file_description} time={this.state.data.upload_time} />
                </div>
                <div className="music-detail_button-container">
                    <div className="music-detail_button-subcontainer"><button className="newPostButton" onClick={this.handleClickOpen}><b>編輯</b></button></div>
                    <div className="music-detail_button-subcontainer"><button className="music-detail_button" onClick={this.handleClickOpenDel}><b>刪除</b></button></div>
                    <div className="music-detail_button-subcontainer"><button className="music-detail_button" onClick={this.goBack}><b>返回</b></button></div>
                </div>
            </div>
        ) : (
            <div></div>
        );
    }
}
