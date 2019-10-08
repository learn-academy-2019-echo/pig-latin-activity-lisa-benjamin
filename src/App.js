import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      phrase: '',
      phraseTranslated: 'This is where your translated sentence will appear.'
    }
  }

  translate = (e) => {
    e.preventDefault()
    let translated = this.state.phrase.split(' ').map(this.translateWordToPigLatin).join(' ')
    this.setState({phraseTranslated: translated})
  }
  
  
  translateWordToPigLatin = word => {
    const vowelsArray = ['a','e','i','o','u']
    const capitalStatesArray = word.split('').map(letter => (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90))
    const isPunctuated = [',','!','.','?',';'].includes(word[word.length-1]) // save state of punctuation 
      
    if (vowelsArray.includes(word[0])) {
      return word + 'way'
    }
    
    if(word.match(/[^A-Za-z0-9,!.?;]/g) && !isPunctuated){
      return word
    }

    let indexOfFirstVowel = -1

    word.split('').forEach((letter, index) => {
      if(vowelsArray.includes(letter) && indexOfFirstVowel === -1){
        indexOfFirstVowel = index
        if (letter === 'u' &&  vowelsArray.includes(word[index +1]) && word[index -1] === 'q'){
          indexOfFirstVowel += 1
        }
      }
    })
    
  
   const pigLatin = (isPunctuated ? word.slice(indexOfFirstVowel, -1) : word.slice(indexOfFirstVowel)) + word.slice(0,indexOfFirstVowel) + 'ay' + (isPunctuated ? word.slice(-1) : '')
   //TODO: handle words without vowels
   
    
    
    return pigLatin.split('').map((letter, index) => capitalStatesArray[index] ? letter.toUpperCase() : letter.toLowerCase()).join('')
  }

  handleChange = (e) => {
    this.setState({phrase: e.target.value})
  }

  render() {
    return (
      
      <div className="wrapper">
        <header className="box header">
          <div id="pigImage">
            <img src='https://lh3.googleusercontent.com/QvvsRY5ShwDNEouVMK8_z7QCwS3grkgd4mzZOlom23Hurralk54ObvsyEMM8ZSNR5pEFBeBMzltzEEcgi2llYJnhXTuXClN3njmMjtw3vgn8Go5jr40fHMNzfI64eYRrnHbZUutxCA=w2400' alt="pig with butcher cut names in pig latin" id="butcherPig"></img>
          </div>
        </header>
        <sidebar className="box sidebar">
          <div>
            <form className="info" onSubmit={this.translate}>
              <label htmlFor="input-phrase">Translate this: </label>
              <input name="input-phrase" onChange={this.handleChange}></input>
              <input className="button" type="submit" value="Submit" />
            </form>
          </div>
        </sidebar>
        <main>
          <div className="text-center box content">
            <p>{this.state.phraseTranslated}</p>
          </div>
        </main>
        <footer className="box footer">
          <div className="text-center">
            <p>Coded by Lisa and Benjamin</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
