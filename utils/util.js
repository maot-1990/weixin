const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
  * 
  * 字符串转json 
  */
function stringToJson(data) {
  return JSON.parse(data);
}
/** 
 * json转字符串
 */
function jsonToString(data) {
  return JSON.stringify(data);
}
/** 
*map转换为json 
*/
function mapToJson(map) {
  return JSON.stringify(strMapToObj(map));
}
/** 
*json转换为map 
*/
function jsonToMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}


/** 
*map转化为对象（map所有键都是字符串，可以将其转换为对象） 
*/
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

/** 
*对象转换为Map 
*/
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}  

module.exports = {
  formatTime: formatTime,
  stringToJson: stringToJson,
  jsonToString: jsonToString,
  mapToJson: mapToJson,
  jsonToMap: jsonToMap,
  strMapToObj: strMapToObj,
  objToStrMap: objToStrMap
}
