import React, { Component } from 'react';

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
      <div>
        <div>{this.state.first} 곱하기 {this.state.second}는?</div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.input}
            type="number"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default Gugudan;
