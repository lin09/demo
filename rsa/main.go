package main

import (
  "crypto/rsa"
  "crypto/rand"
  "crypto/x509"
  "encoding/pem"
  "encoding/base64"
  "encoding/json"
  "bytes"
  "errors"
  "fmt"
)

var prvKey *rsa.PrivateKey
var PubPemEnc string

type Map map[string]interface{}

// 生成rsa key
func Gen() error {
  bits := int(1024)
  var err error

  prvKey, err = rsa.GenerateKey(rand.Reader, bits)
  if err != nil {
    return err
  }

  pkix, err := x509.MarshalPKIXPublicKey(&prvKey.PublicKey)
  if err != nil {
    return err
  }

  block := pem.Block{
    Type: "PUBLIC KEY",
    Bytes: pkix,
  }

  pubPem := pem.EncodeToMemory(&block)
  PubPemEnc = base64.StdEncoding.EncodeToString(pubPem)

  return nil
}

// 解密
func Decrypt(text string) ([]byte, error) {
  var ciphertext []byte
  // 分段解密的长度
  limitLen := 172
  textLen := len(text)
  if textLen % limitLen != 0 {
    return ciphertext, errors.New("加密数据非法")
  }
  for i, j := 0, limitLen; i < textLen; i, j = i + limitLen, j + limitLen {
    decode, err := base64.StdEncoding.DecodeString(text[i:j])
    if err != nil {
      return ciphertext, err
    }
    c, err := rsa.DecryptPKCS1v15(rand.Reader, prvKey, decode)
    if err != nil {
      if err.Error() == "crypto/rsa: decryption error" {
        return ciphertext, errors.New("页面已过期，请刷新重试")
      }
      return ciphertext, err
    }
    var buffer bytes.Buffer
    buffer.Write(ciphertext)
    buffer.Write(c)
    ciphertext = buffer.Bytes()
  }
  return ciphertext, nil
}

// 解密(解密后的数据为json)
func DecryptJson(text string) (Map, error) {
  b, err := Decrypt(text)
  if err != nil {
    return Map{}, err
  }
  var result Map
  err = json.Unmarshal(b, &result)
  return result, err
}

// 加密
func Encrypt(text, pubPemEnc string) (string, error) {
  var encrypted string
  pubPem, err := base64.StdEncoding.DecodeString(pubPemEnc)
  if err != nil {
    return encrypted, err
  }

  block, _ := pem.Decode(pubPem)
  if block == nil {
    return encrypted, errors.New("failed to parse PEM block containing the public key")
  }

  pub, err := x509.ParsePKIXPublicKey(block.Bytes)
  if err != nil {
    return encrypted, err
  }

  // 分段加密的长度
  limitLen := 117
  for i, j, l := 0, limitLen, len(text); i < l; i, j = i + limitLen, j + limitLen {
    if j > l {
      j = l
    }

    enc, err := rsa.EncryptPKCS1v15(rand.Reader, pub.(*rsa.PublicKey), []byte(text[i:j]))
    if err != nil {
      return encrypted, err
    }

    encrypted += base64.StdEncoding.EncodeToString(enc)
  }
  return encrypted, nil
}

// 加密json数据
func EncryptJosn(v interface{}, pubPemEnc string) (string, error) {
  // 配置信息转字符串
  text, err := json.Marshal(v)
  if err != nil {
    return "", err
  }
  // 加密数据
  return Encrypt(string(text), pubPemEnc)
}

func main() {
  Gen()
  fmt.Println(PubPemEnc)
  var es, _ = EncryptJosn(Map{
    "user": "ttt",
    "passwd": "321",
  }, PubPemEnc)
  fmt.Println(es)
  var j, _ = DecryptJson(es)
  fmt.Println(j)
}