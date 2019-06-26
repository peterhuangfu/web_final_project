import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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

    getPdfFile = async () => {
        await fetch('http://localhost:3002/api/getFile')
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
                <span>&nbsp;&nbsp;</span><NavLink to={"/mymusic/" + e.file_id} className="item-title-link"><span className="item-title">{e.file_title}</span></NavLink>
                <span style={{ float: 'right', color: '#ffffff', marginTop: '3px' }}>上傳時間：{e.upload_time.substr(0, 11)}</span>
            </div>
        ));
        return (
            <div>
                <div className="music-list-container">{list}</div>
            </div>
        );
    }
}
