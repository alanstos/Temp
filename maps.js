import React, { Component } from 'react';
import {View, Text,TouchableHighlight, StatusBar, StyleSheet, Image, PermissionsAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Grid, Row, Col, Tile} from 'react-native-elements';
import MapView from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

export default class Lojas extends Component {

  constructor(props){
    super(props)
    this.state = {
      loja: {
       latitude: -22.912482,
       longitude: -43.176900
     },
     posicao:{
       latitude: 0,
       longitude: 0,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
     }
    }
  }

componentDidMount(){
  navigator.geolocation.getCurrentPosition((position) => {
      this.setState({posicao: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }});
    },
    (error) => {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
         message: "<h2>Localização</h2>O aplicativo deseja habilitar sua localização (GPS).<br/><br /><br /> Retorne ao aplicativo em seguida.",
         ok: "Sim",
         cancel: "Não"
      }).then(function(success) {
        navigator.geolocation.getCurrentPosition((position) => {
                this.setState({posicao: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }})
                },(error) => console.log(error.message),{enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
            }.bind(this)
          ).catch((error) => {
                console.log(error.message);
            });
    },
    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
}

  render() {
    return (
              <View style ={styles.container}>
                <MapView
                  style={styles.map}
                  region={this.state.posicao}
                  loadingEnabled={true}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                >
                <MapView.Marker
                      coordinate={this.state.loja}
                      title='Lojas Americanas'
                    />
                </MapView>
              </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
