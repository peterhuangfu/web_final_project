import React, { Component } from "react";
import '../styles/post.css';

export default class Post extends Component {
    render() {
        return (
            <div className="post">
                <div className="post-title"><b>{this.props.title}</b></div>
                <div><span style={{ color: '#ffffff', fontSize: '20px' }}>Upload Time : {this.props.time}
                    <br /><br />
                    Uploaded By {this.props.author}</span>
                </div>
                <hr />
                <div className="post-main">
                    <img src={this.props.source} alt="" className="post-img"></img>
                    <div className="post-text">{this.props.content.split('\n').map((item, i) => { return <span key={i}>{item}<br /></span> } )}</div>
                </div>
            </div>
        );
    }
}
