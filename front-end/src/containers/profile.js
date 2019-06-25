import React, { Component } from "react";
import '../styles/profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', content: '', img_source: '', open: false, password: '' };
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/getProfile')
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success) {
                this.setState(() => ({ id: originData.data[0].id, content: originData.data[0].content, img_source: originData.data[0].img_source }));
            }
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
        window.scrollTo(0,0);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    checkPass = async () => {
        await fetch('http://localhost:3001/api/getPassword')
        .then(res => { return res.json() })
        .then(res => {
            if(res.success) {
                if(this.state.password === res.data[0].password)
                    this.props.history.push('/updateProfile');
                else
                    alert('Wrong Password.');
            }
            else
                alert('Wrong Password.');
        })
        .catch((err) => console.error(err));
        this.setState({ password: '' });
    }

    passInput = e => {
        if(e.key === 'Enter') 
            this.checkPass();
        else
            this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="profile">
                <div className="profile-title">
                    <b>個人資訊</b>
                    <button className="newPostButton" onClick={this.handleClickOpen}><b>編輯</b></button>
                </div>
                <hr />
                <div className="profile-container">
                    <img src={this.state.img_source} alt="" className="profile-img"></img>
                    <div className="profile-text">{this.state.content.split('\n').map(item => { return <span>{item}<br /></span> } )}</div>
                </div>
                <div style={{ minHeight: '10vh' }}></div>
                <div className="profile-title">
                    <b>轉譜紀錄</b>
                </div>
                <hr />
                <div className="profile-container">
                    <div className="profile-text-2 profile-text">{this.state.content.split('\n').map(item => { return <span>{item}<br /></span> } )}</div>
                </div>
            </div>
        );
    }
}
