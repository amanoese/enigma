const Enigma = require('../src/index.js')


describe('Enigma',()=>{
  test('テキストを一文字毎にエンコードできる。エンコードした文字は同じにならない',()=>{
    let enigma = new Enigma();

    expect(enigma.type('H')).not.toBe('H')
    expect(enigma.type('E')).not.toBe('E')
    expect(enigma.type('L')).not.toBe('L')
    expect(enigma.type('L')).not.toBe('L')
    expect(enigma.type('O')).not.toBe('O')
  })
  test('テキストがエンコードできる',()=>{
    let enigma = new Enigma();
    let output = enigma.typeString('HELLO')

    expect(output[0]).not.toBe('H')
    expect(output[1]).not.toBe('E')
    expect(output[2]).not.toBe('L')
    expect(output[3]).not.toBe('L')
    expect(output[4]).not.toBe('O')
  })
  test('テキストがエンコードできる。またデコードできる',()=>{
    let send_enigma = new Enigma();

    //ローターとプラグボード、リフレクターの位置を保存
    let save_rotor = send_enigma.toJSON()
    let encryptOutput = send_enigma.typeString('HELLO')

    //ローターとプラグボード、リフレクターの位置を送り手と同じに
    let receve_enigma = new Enigma(save_rotor);
    let decryptOutput = receve_enigma.typeString(encryptOutput)

    expect(decryptOutput).toBe('HELLO')
  })
})
