import React, { Component } from "react";
import Post from "../components/post";
import '../styles/mymusic_detail.css';

export default class MymusicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', author: '', title: '', content: '', img_source: '', time: '', open: false, password: '', index: 0 };
    }

    // componentDidMount() {
    //     const { id } = this.props.match.params;
    //     let trans = { id: id };
    //     fetch('http://localhost:3001/api/getOneArticle', {
    //         method: 'POST',
    //         body: JSON.stringify(trans),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => { return res.json() })
    //     .then(originData => {
    //         if(originData.success) {
    //             this.setState(() => ({ id: originData.data.id, author: originData.data.author, title: originData.data.title, content: originData.data.content, img_source: originData.data.img_source, time: originData.data.time }));
    //         }
    //         else
    //             alert('Fail.');
    //     })
    //     .catch((err) => console.error(err));
    //     window.scrollTo(0,0);
    // }

    // deleteArticle = async () => {
    //     const { id } = this.props.match.params;
    //     let trans = { id: id };
    //     await fetch('http://localhost:3001/api/deleteArticle', {
    //         method: 'DELETE',
    //         body: JSON.stringify(trans),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => { return res.json() })
    //     .then(res => {
    //         if(res.success)
    //             console.log(res);
    //         else
    //             alert('Fail.');
    //     })
    //     .catch((err) => console.error(err));
    //     this.props.history.push('/articles');
    // }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <div className="article-itself">
                    <Post id={id} title={this.state.title} source={this.state.img_source} author={this.state.author} content={this.state.content} time={this.state.time} />
                </div>
                <div className="article-detail_button-container">
                    <div className="article-detail_button-subcontainer"><button className="newPostButton" onClick={this.handleClickOpen}><b>編輯</b></button></div>
                    <div className="article-detail_button-subcontainer"><button className="article-detail_button" onClick={this.handleClickOpenDel}><b>刪除</b></button></div>
                    <div className="article-detail_button-subcontainer"><button className="article-detail_button" onClick={this.goBack}><b>返回</b></button></div>
                </div>
            </div>
        );
    }
}
