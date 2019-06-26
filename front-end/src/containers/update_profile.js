import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/profile.css';
import '../styles/convertion.css';

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', content: '', img_source: '', waiting: false };
    }
    componentDidMount() {
        window.scrollTo(0,0);

        let user = localStorage.getItem('name');
        let url = 'http://localhost:3002/api/getProfile/' + user;
        fetch(url)
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success) {
                this.setState(() => ({ name: user, content: originData.data.content, img_source: originData.data.img_source }));
            }
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
    }

    update = async () => {
        await this.setState({ waiting: true });

        let data = { name: this.state.name, update: { content: this.state.content, img_source: this.state.img_source } };
        await fetch('http://localhost:3002/api/updateProfile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success)
                setTimeout(() => {
                    this.setState({ waiting: false });
                    this.props.history.push('/profile');
                }, 1500);
            else {
                setTimeout(() => {
                    this.setState({ waiting: false });
                    alert('Fail.');
                    this.props.history.push('/profile');
                }, 1500);
            }
        })
        .catch((err) => {
            console.error(err);
            setTimeout(() => {
                this.setState({ waiting: false });
                alert('Fail.');
            }, 1500);
        });
        // this.props.history.push('/profile');
    }

    clear = () => {
        this.setState({ content: '', img_source: '', waiting: false });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return this.state.name ? (
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
                {this.state.waiting ? <div className="spinning"><CircularProgress size={80} thickness={5} /></div> : null}
            </div>
        ) : (
            <div></div>
        );
    }
}
