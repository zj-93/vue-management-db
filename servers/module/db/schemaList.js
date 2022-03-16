// const mongoose = require('mongoose')
module.exports = {
  users: {
    userName: String, 
    passWord: String,
    createTime: String,
    vipLv: String
  },
  phoneInfo: {
    goodsUrl: String,
    goodsCode: String,
    goodsBrand: String,
    goodsType: String,
    goodsPrice: Number,
    goodsTitle: String,
    subTitle: String,
    saleNum: String
  },
  phoneDetail: {
    goodsUrl: String,
    goodsCode: String,
    goodsBrand: String,
    goodsType: String,
    goodsPrice: Number,
    goodsTitle: String,
    subTitle: String,
    saleNum: String
  },
  notebookInfo: {
    goodsUrl: String,
    goodsCode: String,
    goodsBrand: String,
    goodsType: String,
    goodsPrice: Number,
    goodsTitle: String,
    subTitle: String,
    saleNum: String
  },
  makeupInfo: {
    goodsUrl: String,
    goodsCode: String,
    goodsBrand: String,
    goodsType: String,
    goodsPrice: Number,
    goodsTitle: String,
    subTitle: String,
    saleNum: String
  },
  shopCar: {
    userName: String,
    goodsCode: String,
    goodsUrl: String,
    goodsBrand: String,
    goodsTitle: String,
    goodsPrice: Number,
    subTitle: String,
    saleNum: String,
    goodsNum: String,
    date: String
  }
}
