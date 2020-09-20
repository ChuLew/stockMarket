import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';import { connect } from "react-redux";
import { signIn, signOut, createPerson,currentPerson } from '../../actions'

const KEY = 'AIzaSyCAqsJIDyC3saonVTijPS3_jAY83vWm8Qg';

class VideoMain extends React.Component {
  state = { videos: [], selectedVideo: null };
    componentDidMount(){
        this.onTermSubmit('MSNBC STOCK');
    }
    componentDidUpdate(prevProps){
        if (prevProps.currentCompany!=this.props.currentCompany){
            this.onTermSubmit(this.props.currentCompany + "stock")
        }
    }
  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        key: KEY,
      },
    });

    this.setState({ videos: response.data.items,
    selectedVideo:response.data.items[0] });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      currentCompany: state.stocks.currentCompany,
    };
  };
  
  export default connect(mapStateToProps, { signIn, signOut, createPerson,currentPerson })(
    VideoMain
  );
  
