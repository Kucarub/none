<template>
  <div id="one" style="width:100%;position: relative;margin: 0 auto">
    <div class="canvasContent">
      <div>{{msg}}</div>
      <canvas id="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  export default {
    components: {

    },
    name: 'one',
    data () {
      return {
          msg:'404 NOT FOUND'
      }
    },
    created(){

    },
    mounted() {
    },
    updated(){

    },
    methods: {

    }
  }
  const r = {
    "data": {
      "buyerTel": "北京市海淀区杏石口路甲18号1幢2层2055室  53568011",
      "salerName": "成都市爱米爱饭酒店管理有限责任公司",
      "captureTime": "2018-09-05 09:55:39",
      "invoiceState": "0",
      "invoiceAmount": "234.91",
      "remark": "",
      "passwordArea": null,
      "uuid": "510017113003332423",
      "buyerAddress": "交通银行北京海淀支行 110060576018800012490",
      "salerTaxNo": "91510104777456840F",
      "machineNo": "661608920655",
      "invoiceNo": "03332423",
      "legalizeState": "0",
      "salerTel": "成都市锦江区福兴街30号 028-86700768",
      "verifyCode": "52402538413053020855",
      "buyerTaxNo": "91110108MA004CPN95",
      "receiver": "",
      "drawer": "",
      "reviewer": "",
      "buyerName": "大象慧云信息技术有限公司",
      "invoiceDate": "2017-11-23 00:00:00",
      "invoiceCode": "5100171130",
      "salerAddress": "成都银行股份有限公司金河支行51022003215408400011",
      "totalAmount": "249.00",
      "invoiceTypeCode": "01",
      "detail": [{
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180905095538825a487c27d3daa41f1a6ec7ff611f1a5dd",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "201809050957014906711979256264c98b5dd00caa6fc34bb",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180905095736791013689e1cc884b4dbf1b575e4ff0e00f",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180906144037398b208c6767adf48bbb6bea59bd096301b",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180906182959345970c985a40624a659149e8fef6af2e3f",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180906183908766272842b9dcd6450aaa4fd6608e61e903",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180906190842015ca7015af7d6a40eb9bd57da1c48b3f15",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "2018090619155786560355a45615d425ba3a54573c8147d77",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "201809061923170997242a7b73cb941f9afacc123ab1c73b2",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180907092321677bbba2d4d5b2747f2a06830099298d10c",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180907092938811cd74bf38b1464314acb633c2cff69b61",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "201809070931462288c38277c40ee4f0d9d1c98fbbc55f354",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180907094503494ac4b7bce6f194386a15bf370a2e17595",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180907140841859b67c94b8c09847e89bfb03905ccb94e3",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "201809071409393084766f23fd67440e3a4551814cd569061",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, {
        "unitPrice": "",
        "taxRate": "6%",
        "unit": null,
        "num": "",
        "model": "",
        "id": "20180907141258241d5631095e9c7406fbd06dcb092b344a4",
        "invoiceNo": "03332423",
        "noTaxAmount": "234.91",
        "taxAmount": 14.09,
        "goodsName": "住宿费",
        "invoiceCode": "5100171130",
        "uuid": "510017113003332423"
      }, ]
    }
  }
  let temp = [];
  let errorArr=r.data.detail;
  const jsonObjA=errorArr[0];
  const jsonObjB=errorArr[1];
  function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
  }

  function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
  }

  function getLength(object) {
    var count = 0;
    for (var i in object) count++;
    return count;
  }
  function Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true);//默认为true
  }

  function CompareObj(objA, objB, flag) {
    for (var key in objA) {
      if (!flag) //跳出整个循环
        break;
      if (!objB.hasOwnProperty(key)) { flag = false; break; }
      if (!isArray(objA[key])) { //子级不是数组时,比较属性值
        if (objB[key] != objA[key]) { flag = false; break; }
      } else {
        if (!isArray(objB[key])) { flag = false; break; }
        var oA = objA[key], oB = objB[key];
        if (oA.length != oB.length) { flag = false; break; }
        for (var k in oA) {
          if (!flag) //这里跳出循环是为了不让递归继续
            break;
          flag = CompareObj(oA[k], oB[k], flag);
        }
      }
    }
    return flag;
  }
  var result = Compare(jsonObjA, jsonObjB)
  console.log(result)
</script>

<style scoped>
  .canvasContent{
    text-align: center;
    margin: 0 auto;
  }
</style>
