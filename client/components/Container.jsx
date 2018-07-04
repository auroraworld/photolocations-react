import React from 'react';
import Marker from './Marker';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import InfoWindow from './InfoWindow'
import { getAllLocations } from '../apiClient';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: []
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  };

  componentDidMount() {
    getAllLocations()
      .then(markers => {
        //console.log(markers)
        this.setState({ markers })
      })
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    const style = {
      width: '100vh',
      height: '100vh'
    }

    return (
        <Map google={this.props.google} style={style} searchString={this.props.searchString} click={this.onMapClicked}>
          {this.state.markers.map(marker => {
            return <Marker key={marker.id}
              click={this.onMarkerClick}
              info={marker.info}
              title={marker.title}
              label={marker.label}
              id={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              url={marker.url} />
          })}

          <InfoWindow {...this.props}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div className="infoWindow">
              <h2>{this.state.selectedPlace.title}</h2>
              <img src={this.state.selectedPlace.url} width="300px" />
              <img id="starRating" src="/images/stars.png" alt="star-rating" />
              <p>{this.state.selectedPlace.info}</p>
              <p>Lorem ipsum dolor amet enamel pin blue bottle
                 portland humblebrag XOXO. Godard pour-over knausgaard 
                 sustainable migas. Man bun organic pop-up, ethical gastropub 
                 hashtag 3 wolf moon ennui. Blue bottle truffaut la croix, 
                 narwhal tousled vexillologist hot chicken sustainable celiac four loko.

              </p>
              <p>Read more <a href={`/#/location/${this.state.selectedPlace.id}`}>here</a></p>
            </div>
          </InfoWindow>
        </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAPv7CZEnHS4ZJeuUA2x5Ls6YvX24D4WrI'
})(Container)