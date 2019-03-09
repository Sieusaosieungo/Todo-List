import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        { title: 'buy snack', isComplete: true },
        { title: 'play soccer' , isComplete: 5}, //sua 5 thanh boolean
        { isComplete: true } //them title
      ]
    }

    //Khong phai bind voi onItemClicked boi vi ko truyen cai ham do vao ben trong 
    //xu li su kien ma goi luon o do va no tra ve mot cai ham arrow function khac
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete; //luu lai trang thai hien tai
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);//tim chi so cua item
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,//giu nguyen cac thuoc tih cua object item
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      })
    };
  }

  onChange(event){
    this.setState({
      newItem: event.target.value
    })
  }

  onKeyUp(event) {
   if (event.keyCode === 13) {//neu an enter  
      let text = event.target.value;// lay gia tri tai thoi diem go 
      if (!text) { return; }

      text = text.trim();//xoa het dau cach o dau va cuoi
      if (!text) { return; }// neu tiep tuc khong co text nua thi return

      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      })
    }
  }

  render() {
    const { todoItems, newItem } = this.state;
    return (
      <div className="App">
        <div className="Header">
          <img src={tick} width={32} height={32} alt="error connect" />
          <input
            type="text"
            placeholder="Add a new item"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp} />
        </div>
        {
          todoItems.length > 0 && todoItems.map((item, index) =>
            <TodoItem
              key={index}
              item={item}
              onClick={this.onItemClicked(item)} />)
        }
        {todoItems.length === 0 && 'Nothing here '}
      </div>
    );
  }
}

export default App;
