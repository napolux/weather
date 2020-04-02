import React from 'react';
import { IForecast } from '../openweathermap/OpenWeatherMapApiClient'
import { Card, Image, Modal } from 'semantic-ui-react'

interface ICardState {
  modalOpen: boolean;
}

export default class ForecastCard extends React.Component<IForecast, ICardState> {

  constructor(props: IForecast) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.setState({
      modalOpen: false
    });
  }

  private closeModal() {
    this.setState({ modalOpen: false });
  }

  private openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    return (
      <Card onClick={this.openModal}>
        <Image src={'http://openweathermap.org/img/wn/' + this.props.icon + '@2x.png'} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.date}</Card.Header>
          <Card.Description>
            Temperatura minima: {this.props.min} °C <br />
                Temperatura massima: {this.props.max} °C
              </Card.Description>
        </Card.Content>
        <Modal size="mini" open={this.state.modalOpen} onClose={this.closeModal}>
          <Modal.Header>More data for {this.props.date}</Modal.Header>
          <Modal.Content>
            <ul>
              <li>Humidity: {this.props.humidity}%</li>
              <li>Sunrise: {this.props.sunrise}</li>
              <li>Sunset: {this.props.sunset}</li>
              <li>Wind speed: {this.props.speed} m/s</li>
              <li>Pressure: {this.props.pressure} hPa</li>
            </ul>
          </Modal.Content>
        </Modal>
      </Card>
    );
  }
}