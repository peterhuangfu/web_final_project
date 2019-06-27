import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import '../styles/profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { content: '', img_source: '' };
    }

    componentDidMount() {
        window.scrollTo(0,0);
        let user = localStorage.getItem('account');
        let url = 'http://localhost:3002/api/getProfile/' + user;
        fetch(url)
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success) {
                if(originData.data !== null)
                    this.setState({ content: originData.data.content, img_source: originData.data.img_source });
            }
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
        window.scrollTo(0,0);
    }

    editProfile = () => {
        this.setState({ open: true });
    };

    render() {
        return (
            <div className="profile">
                <div className="profile-title">
                    <b>個人資訊</b>
                    <NavLink to="/updateprofile" className="edit-profile-link"><button className="newPostButton" onClick={this.editProfile}><b>編輯</b></button></NavLink>
                </div>
                <hr />
                <div className="profile-container">
                    <div className="profile-img-container">
                        <img src={this.state.img_source} alt="" className="profile-img"></img>
                    </div>
                    {/* <div className="profile-text">{this.state.content.split('\n').map((item, i) => { return <span key={i}>{item}<br /></span> } )}</div> */}
                    <div className="profile-text"><span>{this.state.content}</span></div>
                </div>
                <div style={{ minHeight: '10vh' }}></div>
                <div className="profile-title">
                    <b>上傳紀錄</b>
                </div>
                <hr />
                <div className="profile-container">
                    {/* <div className="profile-text-2 profile-text">{this.state.content.split('\n').map((item, i) => { return <span key={i}>{item}<br /></span> } )}</div> */}
                    <div className="profile-text profile-text-2"><span>{this.state.content}</span></div>
                </div>
            </div>
        );
    }
}
