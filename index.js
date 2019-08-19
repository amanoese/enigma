let toConv    = (rotor,num) => rotor[num]
let revConv   = (rotor,num) => rotor.indexOf(num)
let nextRotor = rotor => [ ...rotor.slice(1) , rotor[0] ]

let shuf = list => list.sort(_=>Math.random() - 0.5);

class Enigma {
  ID;
  plugBoard;
  rotors;
  refrector;

  rotorsFirsts;

  constructor(option){
    let {plugBoard,rotors,refrector} = JSON.parse(JSON.stringify(option || {}))

    this.plugBoard    = plugBoard || this.rotorGenerator()
    this.rotors       = rotors    || Array.from({length:3}).map(_=>shuf(this.rotorGenerator()))
    this.refrector    = refrector || shuf(this.rotorGenerator())

    console.log(this.toJSON())
    this.rotorsFirsts = [ ...this.rotors ].map(list=>+list[0])
  }
  rotorGenerator(length = 26){
    return Array.from({length}).map((_,i)=>i)
  }
  toJSON(){
    let {plugBoard,rotors,refrector} = this
    return JSON.parse(JSON.stringify({plugBoard,rotors,refrector}))
  }
  convertor(inputNum){
    let phase_1 = toConv(this.plugBoard,inputNum)

    let phase_2 = this.rotors
      .map(list=>toConv.bind(null,list))
      .reduce((result,f)=>f(result),phase_1)

    let phase_3 = toConv(this.refrector,phase_2)

    let phase_4 = this.rotors
      .map(list=>revConv.bind(null,list))
      .reduceRight((result,f)=>f(result),phase_3)

    let phase_5 = revConv(this.plugBoard,phase_4)

    return phase_5
  }
  type(char){
    let alphaNum    = char.toUpperCase().codePointAt() - 65;
    let resultAlpha = String.fromCodePoint(this.convertor(alphaNum) + 65);
    this.updateRotor();
    return resultAlpha;
  }
  typeString(input){
    let output = ''
    input.split('').forEach(v=>{
      output += this.type(v)
    })
    return output
  }
  updateRotor(){
    console.log(new Date(),this.rotors[0][0])
    for (let i = 0; i < this.rotors.length; i++){
      if( i > 0 && this.rotors[i - 1][0] != this.rotorsFirsts[i - 1] ) {break};
      this.rotors[i] = nextRotor(this.rotors[i])
    }
  }
}

module.exports = Enigma
