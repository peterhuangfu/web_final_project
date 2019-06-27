import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadIcon from '@material-ui/icons/CloudUpload';
import '../styles/convertion.css';

export default class Convertion extends Component {
    constructor(props) {
        super(props);
        this.state = { upload: 'notyet', files: null, waiting: false, fileTitle: '', fileContent: '', lastID: 0, pdf: null };
    }

    componentDidMount() {
        window.scrollTo(0,0);
        let url = 'http://localhost:3002/api/getFile/' + localStorage.getItem('account');
        fetch(url)
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success) {
                if(originData.data)
                    this.setState(() => ({ lastID: originData.data.length }));
                else
                    this.setState(() => ({ lastID: 0 }));
            }
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
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
        if(this.state.files === null || this.state.fileTitle === '' || this.state.fileContent === '')
            return null;

        await this.setState({ waiting: true, upload: 'uploading' });

        let wav_file = new Blob([this.state.files[0]], { 'type' : 'audio/wav; codecs=MS_PCM' });
        await fetch('http://007808a4.ngrok.io/test/', {
            method: 'POST',
            body: wav_file
        })
        .then(res => { return res })
        .then(res => {
            this.setState({ pdf: res });
        })
        .catch((err) => {
            console.error(err);
            // setTimeout(() => this.setState({ upload: 'fail', files: null, waiting: false }), 1500);
        });
        
        let save_file = new File([this.state.pdf.body], this.state.files[0].name, { type: 'application/pdf' });
        
        let upload_data = new FormData();
        upload_data.append('file', save_file);

        let current_fileid = this.state.lastID + 1;
        let uploadUrl = 'http://localhost:3002/api/upload/' + localStorage.getItem('account') + '/' + current_fileid.toString() + '/' + this.state.fileContent + '/' + this.state.fileTitle;
        await fetch(uploadUrl, {
            method: 'POST',
            body: upload_data
        })
        .then(res => { return res.json() })
        .then(res => {
            if(res.success){
                setTimeout(() => this.setState({ upload: 'success', files: null, waiting: false, pdf: null }), 1500);
            }
            else {
                alert('Fail.');
                setTimeout(() => this.setState({ upload: 'fail', files: null, waiting: false, pdf: null }), 1500);
            }
        })
        .catch((err) => {
            console.error(err);
            setTimeout(() => this.setState({ upload: 'fail', files: null, waiting: false, pdf: null }), 1500);
        });

        this.setState({ files: null, waiting: false, fileTitle: '', fileContent: '' });
    };

    localUpload = e => {
        if(e.target.files.length === 0)
            this.setState({ upload: 'notyet', files: null });
        else
            this.setState({ upload: 'notyet', files: e.target.files });
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div className="convertion">
                    <div className="convertion-screen">
                        <button type="file" className="upload-button" onClick={e => this.file.click()}>
                            <UploadIcon style={{ width: '60%', minHeight: '83%', maxHeight: '90%' }}/>
                            <b style={{ width: '100%', textAlign: 'center' }}>{this.state.files !== null ? this.state.files[0].name : '上傳WAV、MP3檔'}</b>
                            <input ref={input => this.file = input} style={{ visibility: 'hidden' }} type="file" name="file" onChange={this.localUpload} />
                        </button>
                    </div>
                    <div className="convertion-input-container">
                        <div className="input-subcontainer">
                            <input
                            className="convertion-input-title"
                            id="title"
                            placeholder="檔案標題"
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
                            placeholder="檔案內容"
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
                                : this.state.upload === 'uploading' ? '上傳中...'
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
