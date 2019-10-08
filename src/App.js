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
  
  // The translate function is where you will put your logic to convert the sentence entered by the user to pig location.  What is currently in the function will only directly copy what the user has entered.

  translate = (e) => {
    e.preventDefault()
    //let translated = this.translateWordToPigLatin(this.state.phrase)
    let translated = this.state.phrase.split(' ').map(this.translateWordToPigLatin).join(' ')
    this.setState({phraseTranslated: translated})
  }
  
  translateWordToPigLatin = word => {
    const vowelsArray = ['a','e','i','o','u']
    //TODO handle caps
    
    const setCapitalStates = word.split('').map(letter => letter.charCodeAt(0) < 91)
    console.log(setCapitalStates)
    const 🐋 = word.split('').map(letter => letter === letter.toUpperCase())
    console.log('🐋')
    
    if (vowelsArray.includes(word[0])) {
      return word + 'way'
    }
    
    let indexOfFirstVowel = -1
    let isQuCase = false

    word.split('').forEach((letter, index) => {
      if(vowelsArray.includes(letter) && indexOfFirstVowel === -1){
        indexOfFirstVowel = index
        if (letter === 'u' &&  vowelsArray.includes(word[index +1]) && word[index -1] === 'q'){
          isQuCase = true
        }
      }
      //TODO: handle words without vowels
    })
    
   let pigLatin = ""
   
   if(isQuCase){
     pigLatin = word.slice(indexOfFirstVowel + 1) + word.slice(0,indexOfFirstVowel +1) + 'ay'
   }else {
     pigLatin = word.slice(indexOfFirstVowel) + word.slice(0,indexOfFirstVowel) + 'ay'
   }

    return pigLatin
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
            <p>Coded by * * *</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
