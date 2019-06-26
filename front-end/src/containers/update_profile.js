import React, { Component } from "react";
import '../styles/profile.css';

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', content: '', img_source: '' };
    }
    componentDidMount() {
        window.scrollTo(0,0);
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
    }

    update = async () => {
        let data = { id: '0', update: { content: this.state.content, img_source: this.state.img_source } };
        await fetch('http://localhost:3001/api/updateProfile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success)
                console.log(res);
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
        this.clear();
        this.props.history.push('/profile');
    }

    clear = () => {
        this.setState(() => ({ content: '', img_source: '' }));
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="edit_profile">
                <div className="edit-profile-title"><b>編輯個人資訊</b></div>
                <div className="edit-profile-block">
                    <textarea
                    type="text"
                    className="profile-content-block"
                    onChange={e => this.setState({ content: e.target.value })}
                    placeholder="輸入內容"
                    name="profile_content"
                    value={this.state.content}
                    autoComplete="off"
                    autoFocus={false} />

                    <textarea 
                    type="text" 
                    className="profile-img-block" 
                    onChange={e => this.setState({ img_source: e.target.value })} 
                    placeholder="圖片連結" 
                    name="img_source" 
                    value={this.state.img_source} 
                    autoComplete="off"
                    autoFocus={false} />
                </div>
                <div className="edit-profile_button-container">
                    <button className="edit-profile_button" onClick={this.update}><b>確認</b></button>
                    <button className="edit-profile_button" onClick={this.clear}><b>清空</b></button>
                    <button className="edit-profile_button" style={{ width: '7vw' }} onClick={this.goBack}><b>上一頁</b></button>
                </div>
            </div>
        );
    }
}
