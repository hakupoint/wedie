import {parseString} from 'xml2js';
import {official_accounts_name} from '../config/weixin.js';
let reply = (req,res)=>{
  let xml = req.text;
  let toUser
  parseString(xml,(err, result) =>{
    if(err){
      console.error(err);
      res.send(err);
    }
    let type = result.xml.MsgType[0];
    let toUser = result.xml.FromUserName[0];
    let text = `<xml>
      <ToUserName><![CDATA[${toUser}]]></ToUserName>
      <FromUserName><![CDATA[${official_accounts_name}]]></FromUserName>
      <CreateTime>${~~(new Date().getTime()/1000)}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[吾之一剑将斩断所有的罪]]></Content>
      </xml>
      `;
    res.send(text);
  });
}

export {reply}
