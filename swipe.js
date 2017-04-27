'use strict';

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, Image,Platform} from 'react-native';

import Button from 'react-native-button';
import SwipeCards from 'react-native-swipe-cards';

class NoMoreCards extends Component{
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>Nenhum card até o momento</Text>
      </View>
    )
  }
}

class Card extends Component {
  _handlePress() {
    Alert.alert(
      'Alert Title',
      'Alert text',
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.titleText}</Text>
        <Text style={styles.textItem}>{this.props.textItem}</Text>
        <Text style={styles.textSubItem}>{this.props.textSubItem}</Text>
        <Button
            style={styles.button}
            styleDisabled={{color: 'red'}}
            onPress={() => this._handlePress()}>
            {this.props.textButton}
        </Button>

        <Text style={styles.createDate}>{this.props.createDate}</Text>
        <Image source={require('./image/bandeira.png')} style={styles.card} resizeMode="contain"/>
        <View style={styles.cardDate}>
            <Text style={styles.cardsTitle}>{this.props.cardsTitle}</Text>
            <Text style={styles.cardsDate}>{this.props.cardsDate}</Text>
        </View>
    </View>
    )
  }

}

// const Cards = [
//     {
//       titleText: "Ponto de ruptura",
//       textItem: '_Item_06434564484944_ 06434564484944_',
//       textButton: 'Visão Comercial - lojas',
//       createDate: 'Criado: 10:58 - 23/02/17',
//       cardsTitle: 'Cards',
//       cardsDate: '07/07',
//     },
//     {
//       titleText: "Lorem Ipsum lala",
//       textItem: '_Item_06434564484944_ 06434564484944_',
//       textButton: 'Visão Comercial - lojas',
//       createDate: 'Criado: 10:58 - 23/02/17',
//       cardsTitle: 'Cards',
//       cardsDate: '07/07',
//     },
//     {
//       titleText: "Item sem venda",
//       textItem: '_Item_06434564484944_ 06434564484944_',
//       textButton: 'Visão Comercial - lojas',
//       createDate: 'Criado: 10:58 - 23/02/17',
//       cardsTitle: 'Cards',
//       cardsDate: '07/07',
//     },
// ]

export default class swipe extends Component {

  constructor(props){
    super(props);
    this.state = {
      cards: [],
      outOfCards: false
     };
  }

  componentWillMount() {
    this.previsaoTempo();
    this.dolar();
    this.libra();
    this.lame3();
    this.lame4();
  }

  previsaoTempo = () => {

      fetch("https://api.hgbrasil.com/weather/?format=json&cid=BRXX0201", {
          method: "GET",
          headers: {
              'Content-Type': 'application/json' }
        }).then((responseData) => {
            if (responseData.status === 200) {
              (responseData.json()).then((response) => {
                  let data = this.state.cards.slice();

                  data.push(
                    {
                      titleText: response.results.city_name + ' ' + response.results.temp + '°C ',
                      textItem: response.results.forecast[0].description,
                      textSubItem: 'Max. ' +response.results.forecast[0].max
                        + '°C - Min. ' +response.results.forecast[0].min
                        + '°C',
                      createDate: response.results.forecast[0].date
                        + ' ' +  response.results.forecast[0].weekday
                        + ' - '+ response.results.time,
                      cardsTitle: 'Cards',
                      cardsDate: '01/01',
                    }
                   );

                  this.setState({cards : data });
              });
            } else {Alert.alert('Dados inválidos', responseData.status.toString())}
      }).catch((error) => {
          console.log(error);
      }).done();
    }

    dolar = () => {

      fetch(
        "http://api.promasters.net.br/cotacao/v1/valores?alt=json", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json' }
          }).then((responseData) => {
            if (responseData.status === 200) {
              (responseData.json()).then((response) => {
                let data = this.state.cards.slice();

                data.push(
                  {
                    titleText: response.valores.USD.nome,
                    textItem: response.valores.USD.valor,
                    textSubItem: response.valores.USD.fonte,
                    createDate: response.valores.USD.ultima_consulta,
                    cardsTitle: 'Cards',
                    cardsDate: '01/01',
                  }
                );

                this.setState({cards : data });

              });
            } else { Alert.alert('Dados inválidos', responseData.status.toString()); }
          }).catch((error) => {
            console.log(error);
          }).done();
        }


      libra = () => {

          fetch(
            "http://api.promasters.net.br/cotacao/v1/valores?alt=json", {
              method: "GET",
              headers: {
                'Content-Type': 'application/json'}
              }).then((responseData) => {
                if (responseData.status === 200) {
                  (responseData.json()).then((response) => {
                    let data = this.state.cards.slice();

                    data.push(
                      {
                        titleText: response.valores.GBP.nome,
                        textItem: response.valores.GBP.valor,
                        textSubItem: response.valores.GBP.fonte,
                        createDate: response.valores.GBP.ultima_consulta,
                        cardsTitle: 'Cards',
                        cardsDate: '01/01',
                      }
                    );

                    this.setState({cards : data });

                  });
                } else { Alert.alert('Dados inválidos', responseData.status.toString()); }
              }).catch((error) => {
                console.log(error);
              }).done();
            }


      lame3 = () => {

        fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22LAME3.SA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json' }
          }).then((responseData) => {
              if (responseData.status === 200) {
                (responseData.json()).then((response) => {
                    let data = this.state.cards.slice();

                    data.push(
                      {
                        titleText: response.query.results.quote.symbol,
                        textItem: 'Valor: ' + response.query.results.quote.LastTradePriceOnly,
                        textSubItem:  'Alta: ' + response.query.results.quote.DaysHigh,
                        createDate: 'Baixa: ' + response.query.results.quote.DaysLow,
                        cardsTitle: 'Cards',
                        cardsDate: '01/01',
                      }
                     );

                    this.setState({cards : data });
                });
              } else {Alert.alert('Dados inválidos', responseData.status.toString())}
        }).catch((error) => {
            console.log(error);
        }).done();
      }


      lame4 = () => {

        fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22LAME4.SA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json' }
          }).then((responseData) => {
              if (responseData.status === 200) {
                (responseData.json()).then((response) => {
                    let data = this.state.cards.slice();

                    data.push(
                      {
                        titleText: response.query.results.quote.symbol,
                        textItem: 'Valor: ' + response.query.results.quote.LastTradePriceOnly,
                        textSubItem: 'Alta: ' + response.query.results.quote.DaysHigh,
                        createDate: 'Baixa: ' + response.query.results.quote.DaysLow,
                        cardsTitle: 'Cards',
                        cardsDate: '01/01',
                      }
                     );

                    this.setState({cards : data });
                });
              } else {Alert.alert('Dados inválidos', responseData.status.toString())}
        }).catch((error) => {
            console.log(error);
        }).done();
      }


  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 4

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}

        nopeText={'Apagar'}
        yupText={'Próximo'}
      />
    )
  }
}

const styles = StyleSheet.create({
  feedNews: {
      position: 'relative',
      height: 250
  },
  container: {
    backgroundColor: '#318fdc',
    width: '95%',
    marginLeft: '2%',
    marginTop: 0,
    height: 160,
    borderRadius: 5,
    position: 'relative',
    padding: 15,
    paddingTop: 8
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d65a0',
    width: '80%',
    marginLeft: '10%',
    marginTop: 50,
    height: 150,
    borderRadius: 5,
    opacity: 0.5,
    position: 'absolute',
    top: 12
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d65a0',
    width: '70%',
    marginLeft: '15%',
    marginTop: 50,
    height: 150,
    borderRadius: 5,
    opacity: 0.2,
    position: 'absolute',
    top: 0
  },
  titleText: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: Platform.OS == 'ios' ? 'Arial' : 'Roboto',
    fontWeight: 'bold'
  },
  textItem: {
    textAlign: 'left',
    color: '#ffffff',
    marginBottom: 5,
    width: '80%',
    fontStyle: 'italic'
  },
  textSubItem: {
    fontSize: 10,
    textAlign: 'left',
    color: '#ffffff',
    width: '80%',
    fontStyle: 'italic'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 160,
    borderBottomColor: 'transparent',
    color: '#ffffff',
    fontStyle: 'italic',
    fontSize: 10,
    fontWeight: 'normal',
    height: 27,
    paddingTop: 6,
    marginTop: 15
  },
  createDate: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 10,
    borderTopWidth: 0.7,
    borderTopColor: '#ffffff',
    paddingTop: 7,
    fontStyle: 'italic',
  },
  cardDate: {
    position: 'absolute',
    top: 0,
    right: 28
  },
  backgroundImage: {
      width: 50,
      height: 50,
  },
  textContainerBox: {
    textAlign: 'center',
    fontStyle : 'italic',
    color:'#858585',
    fontWeight : 'bold'
  },
  card: {
    width: 60,
    height: 90,
    position: 'absolute',
    right: 15,
    top: -15,

  },
  cardsTitle: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 7,
    backgroundColor:'#00629D'
  },
  cardsDate: {
    fontSize: 11,
    color: '#ffffff',
    marginTop: 3,
    fontWeight: 'bold',
    backgroundColor:'#00629D'
  }
})
