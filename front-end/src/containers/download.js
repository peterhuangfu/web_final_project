import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
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

    download = async (file_id) => {
        await fetch('http://c07dcf43.ngrok.io/test/')
        .then(res => { console.log(res) })
        // .then(pdfList => {
        //     if(pdfList.success){
        //         pdfList.data.reverse();
        //         this.setState(() => ({ data: pdfList.data }));
        //     }
        //     else
        //         alert('Fail.');
        // })
        .catch((err) => console.error(err));
    }

    getPdfFile = async () => {
        let url = 'http://localhost:3002/api/getFile/' + localStorage.getItem('account');
        await fetch(url)
        .then(res => { return res.json() })
        .then(pdfList => {
            if(pdfList.success){
                pdfList.data.reverse();
                this.setState(() => ({ data: pdfList.data }));
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
                <div className="download-button"><Button variant="contained" color="primary" onClick={event => this.download(e.file_id)}>下載</Button></div>
                <div><span style={{ color: '#ffffff' }}>上傳時間：{e.upload_time.substr(0, 11)}</span></div>
            </div>
        ));
        return (
            <div>
                <div className="music-list-container">{list}</div>
            </div>
        );
    }
}
