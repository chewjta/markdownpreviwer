import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Form from 'react-bootstrap/Form';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


let marked = require('marked');

marked.setOptions({
  breaks:true
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: placeholder,
      inputMaximized: false,
      outputMaximized: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleInputMaximize = this.handleInputMaximize.bind(this);
    this.handleOutputMaximize = this.handleOutputMaximize.bind(this);
  }
  

  handleChange(event){
    this.setState({
      userInput: event.target.value
    });
  }

  handleInputMaximize() {
    this.setState({
      inputMaximized: !this.state.inputMaximized
    });
  }
  handleOutputMaximize() {
    this.setState({
      outputMaximized: !this.state.outputMaximized
    });
  }

  render() {


    const classes = this.state.inputMaximized ? 
    ['inputWrap maximized', 
     'outputWrap hide', 
     'fa fa-compress'] : 
    this.state.outputMaximized ?
    ['inputWrap hide', 
     'outputWrap maximized', 
     'fa fa-compress'] :
    ['inputWrap', 
     'outputWrap', 
     'fa fa-arrows-alt'];



  return (
    
    <div>
      <div class='author'>Simple Markdown Previewer <br/>by <a target="_blank" href="https://codepen.io/chewjta">Alvis</a></div>
      <div className = {classes[0]}>
        <Toolbar icon={classes[2]}
                  onClick={this.handleInputMaximize}
                  text="Input" />
        <Input userInput={this.state.userInput}
                onChange={this.handleChange} />
      </div>
      <div className = {classes[1]}>
        <Toolbar icon={classes[2]}
                  onClick={this.handleOutputMaximize}
                  text="Output" />
        <Output userInput ={this.state.userInput}  />
        </div>  
    </div>
  )
}
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i class="fab fa-free-code-camp"></i>      
      {props.text}
      <i onClick={props.onClick} className={props.icon}></i>
    </div>
 )
}

const Input = (props) => {
return (
  <textarea id="input"
    value={props.userInput}
    onChange={props.onChange}
    type="text"/>
  )
}

const Output = (props) => {
return (
    <div id='output' dangerouslySetInnerHTML={{__html: marked(props.userInput, { renderer: renderer })}} />
  )
}

const placeholder = `#Hi!


##Look closely at how this stuff works

###And you will realise this is a secret cheatsheet on markdowns...


Lets begin with some code, \`<body></body>\`, between 2 backticks.

\`\`\`
// this also works for python

def my_function():
  print("Hello from a function")
**my_function()**

\`\`\`

It also works for tables:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

and if you noticed my function carefully...

You realized it is actually **bold**...!
or was it _italic_?
Or... wait for it... **_both!_**
And feel free to ~~ignore this~~.

And of course... [links](https://www.freecodecamp.com), and
> Block Quotes... handy in email to emulate reply text...

Then...Lists...

1. First ordered list item
2. Another item
  * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses

Credit to markdown cheatsheet by Adam P on GitHub:
![GitHub](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)
`



export default App;
