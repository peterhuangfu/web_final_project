import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FileSaver from 'file-saver';
import '../styles/download.css';

export default class Download extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.getPdfFile();
        window.scrollTo(0,0);
    }

    download = (file_id, filename) => {
        // let blob = new Blob([JSON.stringify('http://localhost:3002/api/gethihi/' + filename)], { type: "application/pdf" });
        // FileSaver.saveAs(blob, "file_" + file_id + ".pdf");
        let url = 'http://localhost:3002/api/gethihi/' + filename;
        FileSaver.saveAs(url, "file_" + file_id + ".pdf");
    }

    getPdfFile = async () => {
        let url = 'http://localhost:3002/api/getFile/' + localStorage.getItem('account');
        await fetch(url)
        .then(res => { return res.json() })
        .then(pdfList => {
            if(pdfList.success){
                pdfList.data.reverse();
                this.setState(() => ({ data: pdfList.data, filename: pdfList.data[0].filename }));
            }
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
    }

    render() { 
        const list = this.state.data.map((e, i) => (
            <div key={i} className="music-item">
                <div><span>&nbsp;&nbsp;</span><NavLink to={"/mymusic/" + e.file_id} className="item-title-link"><span className="item-title">{e.file_title}</span></NavLink></div>
                <div className="download-button"><Button variant="contained" color="primary" onClick={event => this.download(e.file_id, e.filename)}>下載</Button></div>
                <div><span style={{ color: '#ffffff' }}>上傳時間：{e.uploadDate.substr(0, 10)}</span></div>
            </div>
        ));
        return (
            <div>
                <div className="music-list-container">{list}</div>
            </div>
        );
    }
}
