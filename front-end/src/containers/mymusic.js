import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../styles/mymusic.css';

export default class Mymusic extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null, yourself: localStorage.getItem('name') };
    }
    componentDidMount() {
        this.getPdfFile();
        window.scrollTo(0,0);
    }

    getPdfFile = async () => {
        let url = 'http://localhost:3002/api/getFile/' + localStorage.getItem('account');
        await fetch(url)
        .then(res => { return res.json() })
        .then(originData => {
            if(originData.success) {
                if(originData.data) {
                    originData.data.reverse();
                    this.setState(() => ({ data: originData.data }));
                }
                else {
                    this.setState(() => ({ data: [] }));
                }
                
            }
            else
                alert('Fail.');
        })
        .catch((err) => console.error(err));
    }

    render() {
        return this.state.data ? (
            <div>
                <GridList cellHeight={180} className="grid-list">
                    {this.state.data.map((data, i) => (
                    <GridListTile key={i} style={{ width: '25vw', height: '40vh', padding: '1em' }}>
                        <div className="hover-screen">
                            <NavLink to={"/mymusic/" + data.metadata.file_id}>
                                <img src='http://i.imgur.com/Dqef6.jpg' alt={data.metadata.file_title} style={{ maxWidth: '25vw', height: '75%' }}/>
                                <GridListTileBar
                                style={{ height: '25%' }}
                                title={data.metadata.file_title}
                                subtitle={<span>by {this.state.yourself}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${data.metadata.file_title}`} style={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                                />
                            </NavLink>
                        </div>
                    </GridListTile>
                    ))}
                </GridList>
            </div>
        ) : (
            <div></div>
        );
    }
}
