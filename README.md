# enigma

[![Build Status](https://travis-ci.org/amanoese/enigma.svg?branch=master)](https://travis-ci.org/amanoese/enigma)
[![npm version](http://img.shields.io/npm/v/@amanoese/enigma.svg)](https://npmjs.org/package/@amanoese/enigma)


enigmaのNode.jsによるシンプルな実装です。

## Install

```bash
$ npm install @amanoese/enigma
```

## Usage

```javascript
const Enigma = require('@amanoese/enigma')

//ローターとプラグボード、リフレクターの位置を保存
let save_rotor = new Enigma().toJSON()

//送信側のエニグマを生成
//ローターとプラグボード、リフレクターの位置を設定
let send_enigma = new Enigma(save_rotor);
let encryptOutput = send_enigma.typeString('HELLO')

console.log(encryptOutput) // HELLOではない英字列

//受信側のエニグマを生成
//ローターとプラグボード、リフレクターの位置を設定
let receve_enigma = new Enigma(save_rotor);
let decryptOutput = receve_enigma.typeString(encryptOutput)

console.log(decryptOutput) // HELLO
```
