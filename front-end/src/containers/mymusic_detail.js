import React, { Component } from "react";
import Post from "../components/post";
import '../styles/mymusic_detail.css';

export default class MymusicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null, yourself: localStorage.getItem('name') };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        let url = 'http://localhost:3002/api/getFile/' + localStorage.getItem('account') + '/' + id;
        fetch(url)
        .then(res => { return res.json() })
        .then(originData => {
            //console.log(originData.data[0].uploadDate)
            if(originData.success)
                this.setState(() => ({ data: originData.data }));
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
        window.scrollTo(0,0);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { id } = this.props.match.params;
        return this.state.data ? (
            <div>
                <div className="music-itself">
                    <Post id={id} title={this.state.data.file_title} source="http://i.imgur.com/Dqef6.jpg" author={this.state.yourself} content={this.state.data.file_description} time={this.state.data[0].uploadDate.substr(0, 10)} />
                </div>
                <div className="music-detail_button-container">
                    <button className="music-detail_button" onClick={this.goBack}><b>上一頁</b></button>
                </div>
            </div>
        ) : (
            <div></div>
        );
    }
}
