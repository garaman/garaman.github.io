import React, { Component } from 'react';
import './Gugudan.css';

class Gugudan extends Component {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  };

  input = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState({
        result: '정답: ' + this.state.value,
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
      }, () => {
        this.input.current.focus();
      });
    } else {
      this.setState({
        result: '땡',
        value: '',
      }, () => {
        this.input.current.focus();
      });
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="gugudan-container">
        <div className="gugudan-question">
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.input}
            type="number"
            value={this.state.value}
            onChange={this.onChange}
            className="gugudan-input"
            placeholder="정답 입력"
            autoFocus
          />
          <button className="gugudan-button">입력!</button>
        </form>
        <div className="gugudan-result">
          {this.state.result ? this.state.result : '결과가 여기에 표시됩니다.'}
        </div>
      </div>
    );
  }
}

export default Gugudan;
