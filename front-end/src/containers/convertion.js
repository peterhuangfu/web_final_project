import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import '../styles/convertion.css';

export default class Convertion extends Component {
    constructor(props) {
        super(props);
        this.state = { upload: 'notyet', files: null, waiting: false };
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    upload = async () => {
        await this.setState({ waiting: false });

        let data = new FormData();
        data.append('wavfile', this.state.files[0], this.state.files[0].name);

        // await fetch('http://localhost:3002/api/uploadFile', {
        //     method: 'POST',
        //     body: data,
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then(res => { return res.json() })
        // .then(res => {
        //     if(res.success)
        //         this.setState({ upload: 'success', files: null, waiting: false });
        //     else
        //         this.setState({ upload: 'fail', files: null, waiting: false });
        // })
        // .catch((err) => console.error(err));
        // this.setState({ upload: 'notyet', files: null, waiting: false });
    }

    clear = () => {
        this.setState({ upload: 'notyet', files: null });
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div className="convertion">
                    <div className="convertion-screen">
                        <button type="file" className="upload-button" onClick={e => this.file.click()}>
                            <UploadIcon style={{ width: '60%', height: '90%' }}/>
                            <b style={{ width: '100%', textAlign: 'center' }}>{this.state.files !== null ? this.state.files[0].name : '上傳WAV檔'}</b>
                            <input ref={input => this.file = input} style={{ visibility: 'hidden' }} type="file" onChange={e => this.setState({ files: e.target.files })} />
                        </button>
                    </div>
                    <div className="convertion-actions">
                        <div className="sub-actions"><button className="newPostButton" onClick={this.clear}><b>清空</b></button></div>
                        <div className="sub-actions"><button className="newPostButton" onClick={this.upload}><b>上傳</b></button></div>
                    </div>
                    <div className="convertion-state">
                        <span className="convertion-description">
                            <b>上傳狀態：{this.state.upload === 'success' ? '成功' 
                                : this.state.upload === 'notyet' && this.state.files === null ? '尚未上傳' 
                                : this.state.upload === 'notyet' && this.state.files !== null ? '等待上傳...' 
                                : '失敗'}
                            </b>
                        </span>
                    </div>
                </div>
                {this.state.waiting ? <div className="spinning"><CircularProgress size={80} thickness={5} /></div> : null}
            </div>
        );
    }
}
