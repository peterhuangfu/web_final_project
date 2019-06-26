import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import '../styles/convertion.css';

export default class Convertion extends Component {
    constructor(props) {
        super(props);
        this.state = { upload: 'notyet', files: null, waiting: false, fileTitle: '', fileContent: '', lastID: '0' };
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    clear = () => {
        this.setState({ upload: 'notyet', files: null });
    }

    edit = key => e => {
        if(key === 'title')
            this.setState({ fileTitle: e.target.value });
        else
            this.setState({ fileContent: e.target.value });
    }

    putFileInDB = async () => {
        await this.setState({ waiting: true });
        await fetch('http://localhost:3002/api/getFile')
        .then(res => { return res.json() })
        .then(res => {
            this.setState({ lastID: res.data.length });
        })

        let data = new FormData();
        let uploader = localStorage.getItem('name');
        data.append('file', this.state.files[0], this.state.files[0].name, this.state.fileTitle, this.state.fileContent, uploader, this.state.lastID);
        
        await fetch('http://localhost:3002/api/uploadFile', {
            method: 'POST',
            body: data
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success)
                setTimeout(() => this.setState({ upload: 'success', files: null, waiting: false }), 1500);
            else
                setTimeout(() => this.setState({ upload: 'fail', files: null, waiting: false }), 1500);
        })
        .catch((err) => console.error(err));
    };

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div className="convertion">
                    <div className="convertion-screen">
                        <button type="file" className="upload-button" onClick={e => this.file.click()}>
                            <UploadIcon style={{ width: '60%', height: '90%' }}/>
                            <b style={{ width: '100%', textAlign: 'center' }}>{this.state.files !== null ? this.state.files[0].name : '上傳WAV、MP3檔'}</b>
                            <input ref={input => this.file = input} style={{ visibility: 'hidden' }} type="file" name="file" onChange={e => this.setState({ files: e.target.files })} />
                        </button>
                    </div>
                    <div className="convertion-input-container">
                        {/* <div className="input-subcontainer">
                            <div className="convertion-input-title">
                                <input 
                                id="title"
                                placeholder="文件標題"
                                type="text"
                                value={this.state.fileTitle}
                                onChange={this.edit('title')}
                                autoComplete="off" />
                            </div>
                        </div> */}
                        <div className="input-subcontainer">
                            <input
                            className="convertion-input-title"
                            id="title"
                            placeholder="文件標題"
                            type="text"
                            value={this.state.fileTitle}
                            onChange={this.edit('title')}
                            autoComplete="off"
                            autoFocus={false} />
                        </div>
                        <div className="input-subcontainer">
                            <textarea
                            className="convertion-input-content"
                            id="content"
                            placeholder="文件內容"
                            type="text"
                            value={this.state.fileContent}
                            onChange={this.edit('content')}
                            autoComplete="off"
                            autoFocus={false} />
                        </div>
                    </div>
                    <div className="convertion-actions">
                        <div className="sub-actions"><button className="newPostButton" onClick={this.clear}><b>清空</b></button></div>
                        <div className="sub-actions"><button className="newPostButton" onClick={this.putFileInDB}><b>上傳</b></button></div>
                    </div>
                    <div className="convertion-state">
                        <span className="convertion-description">
                            <b>上傳狀態：{this.state.upload === 'success' ? '成功！請到下載專區下載' 
                                : this.state.upload === 'notyet' && this.state.files === null ? '尚未上傳' 
                                : this.state.upload === 'notyet' && this.state.files !== null ? '等待上傳...' 
                                : '失敗！請重新上傳'}
                            </b>
                        </span>
                    </div>
                </div>
                {this.state.waiting ? <div className="spinning"><CircularProgress size={80} thickness={5} /></div> : null}
            </div>
        );
    }
}
