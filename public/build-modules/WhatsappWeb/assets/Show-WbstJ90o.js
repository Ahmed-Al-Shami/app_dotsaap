import{_ as C}from"./UserLayout-CXO-83Mq.js";import{k as y,c as o,o as u,b as s,F as _,g as R,f as d,t as r,n as T}from"./app-BPxwetsb.js";import"./sharedComposable-TMw4c8uc.js";import"./toastComposable-BZSSJ7BC.js";import"./Modal-BIKyjMag.js";import"./modalStore-CB1x_O57.js";import"./IntersectionObserver-D-rwMhVF.js";import"./AssetModal-Dh0jwXcc.js";import"./assetStore-W3D4A6Yl.js";const L={class:"flex flex-col items-center justify-between gap-2 xl:flex-row"},$={class:"card max-w-max p-1"},f=["onClick"],I={class:"text-xs md:text-sm"},k={class:"card max-w-max p-1"},P=["onClick"],g={class:"text-xs md:text-sm"},v={class:"mt-8 space-y-8"},S={key:0,class:"space-y-8"},b={class:"card card-body"},N={class:"mb-5 font-semibold"},w={class:"overflow-x-auto rounded bg-gray-100 p-2 dark:bg-dark-900"},D={key:1,class:"space-y-8"},q={class:"card card-body"},M={class:"mb-5 font-semibold"},V={class:"overflow-x-auto rounded bg-gray-100 p-2 dark:bg-dark-900"},x={key:2,class:"space-y-8"},A={class:"card card-body"},B={class:"mb-5 font-semibold"},K={class:"overflow-x-auto rounded bg-gray-100 p-2 dark:bg-dark-900"},F={key:3,class:"space-y-8"},H={class:"card card-body"},G={class:"mb-5 font-semibold"},j={class:"overflow-x-auto rounded bg-gray-100 p-2 dark:bg-dark-900"},Q={class:"card card-body"},W={class:"mb-2 font-semibold"},X={class:"table-responsive mt-6 w-full"},Y={class:"table"},z={class:"tbody"},pe=Object.assign({layout:C},{__name:"Show",props:["app","authKey"],setup(h){const e=h,p=y("curl"),n=y("text"),m=[{title:"cUrl",value:"curl"},{title:"Php",value:"php"},{title:"NodeJs",value:"nodejs"},{title:"Python",value:"python"}],O=[{title:"Text",value:"text"},{title:"Image",value:"image"},{title:"Audio",value:"audio"},{title:"Video",value:"video"},{title:"Document",value:"document"}],l={curl:{text:`curl --location --request POST '${route("user.whatsapp-web.api.send-message")}' 

--form 'app_key="${e.app.key}"' 

--form 'auth_key="${e.authKey}"' 

--form 'to="RECEIVER_NUMBER"' 

--form 'type="text"' 

--form 'message="Example message"'`,image:`curl --location --request POST '${route("user.whatsapp-web.api.send-message")}' 

--form 'app_key="${e.app.key}"' 

--form 'auth_key="${e.authKey}"' 

--form 'to="RECEIVER_NUMBER"' 

--form 'type="image"' 

--form 'url="<DIRECT_IMAGE_URL>"'`,audio:`curl --location --request POST '${route("user.whatsapp-web.api.send-message")}' 

--form 'app_key="${e.app.key}"' 

--form 'auth_key="${e.authKey}"' 

--form 'to="RECEIVER_NUMBER"' 

--form 'type="audio"' 

--form 'url="<DIRECT_AUDIO_URL>"'`,video:`curl --location --request POST '${route("user.whatsapp-web.api.send-message")}' 

--form 'app_key="${e.app.key}"' 

--form 'auth_key="${e.authKey}"' 

--form 'to="RECEIVER_NUMBER"' 

--form 'type="video"' 

--form 'url="<DIRECT_VIDEO_URL>"'`,document:`curl --location --request POST '${route("user.whatsapp-web.api.send-message")}' 

--form 'app_key="${e.app.key}"' 

--form 'auth_key="${e.authKey}"' 

--form 'to="RECEIVER_NUMBER"' 

--form 'type="document"' 

--form 'url="<DIRECT_DOCUMENT_URL>"'`},php:{text:`$curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => '${route("user.whatsapp-web.api.send-message")}',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array(
      'app_key' => '${e.app.key}',
      'auth_key' => '${e.authKey}',
      'to' => 'RECEIVER_NUMBER',
      'message' => 'Example message',
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;`,image:`$curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => '${route("user.whatsapp-web.api.send-message")}',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array(
      'app_key' => '${e.app.key}',
      'auth_key' => '${e.authKey}',
      'to' => 'RECEIVER_NUMBER',
      'type' => 'image',
      'url' => '<DIRECT_IMAGE_URL>',
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;`,audio:`$curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => '${route("user.whatsapp-web.api.send-message")}',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array(
      'app_key' => '${e.app.key}',
      'auth_key' => '${e.authKey}',
      'to' => 'RECEIVER_NUMBER',
      'type' => 'audio',
      'url' => '<DIRECT_AUDIO_URL>',
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;`,video:`$curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => '${route("user.whatsapp-web.api.send-message")}',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array(
      'app_key' => '${e.app.key}',
      'auth_key' => '${e.authKey}',
      'to' => 'RECEIVER_NUMBER',
      'type' => 'video',
      'url' => '<DIRECT_VIDEO_URL>',
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;`,document:`$curl = curl_init();
      curl_setopt_array($curl, array(
      CURLOPT_URL => '${route("user.whatsapp-web.api.send-message")}',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array(
      'app_key' => '${e.app.key}',
      'auth_key' => '${e.authKey}',
      'to' => 'RECEIVER_NUMBER',
      'type' => 'document',
      'url' => '<DIRECT_DOCUMENT_URL>',
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;`},nodejs:{text:`var request = require('request');
    var options = {
      'method': 'POST',
      'url': '${route("user.whatsapp-web.api.send-message")}',
      'headers': {
      },
      formData: {
        'app_key': '${e.app.key}',
        'auth_key': '${e.authKey}',
        'to': 'RECEIVER_NUMBER',
        'message': 'Example message'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });`,image:`var request = require('request');
    var options = {
      'method': 'POST',
      'url': '${route("user.whatsapp-web.api.send-message")}',
      'headers': {
      },
      formData: {
        'app_key': '${e.app.key}',
        'auth_key': '${e.authKey}',
        'to': 'RECEIVER_NUMBER',
        'type': 'image',
        'url': '<DIRECT_IMAGE_URL>'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });`,audio:`var request = require('request');
    var options = {
      'method': 'POST',
      'url': '${route("user.whatsapp-web.api.send-message")}',
      'headers': {
      },
      formData: {
        'app_key': '${e.app.key}',
        'auth_key': '${e.authKey}',
        'to': 'RECEIVER_NUMBER',
        'type': 'audio',
        'url': '<DIRECT_AUDIO_URL>'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });`,video:`var request = require('request');
    var options = {
      'method': 'POST',
      'url': '${route("user.whatsapp-web.api.send-message")}',
      'headers': {
      },
      formData: {
        'app_key': '${e.app.key}',
        'auth_key': '${e.authKey}',
        'to': 'RECEIVER_NUMBER',
        'type': 'video',
        'url': '<DIRECT_VIDEO_URL>'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });`,document:`var request = require('request');
    var options = {
      'method': 'POST',
      'url': '${route("user.whatsapp-web.api.send-message")}',
      'headers': {
      },
      formData: {
        'app_key': '${e.app.key}',
        'auth_key': '${e.authKey}',
        'to': 'RECEIVER_NUMBER',
        'type': 'document',
        'url': '<DIRECT_DOCUMENT_URL>'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });`},python:{text:`import requests

    url = "${route("user.whatsapp-web.api.send-message")}"

    payload={
    'app_key': '${e.app.key}',
    'auth_key': '${e.authKey}',
    'to': 'RECEIVER_NUMBER',
    'message': 'Example message',

    }
    files=[]
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    print(response.text)`,image:`import requests

    url = "${route("user.whatsapp-web.api.send-message")}"

    payload={
    'app_key': '${e.app.key}',
    'auth_key': '${e.authKey}',
    'to': 'RECEIVER_NUMBER',
    'type': 'image',
    'url': '<DIRECT_IMAGE_URL>',

    }
    files=[]
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    print(response.text)`,audio:`import requests

    url = "${route("user.whatsapp-web.api.send-message")}"

    payload={
    'app_key': '${e.app.key}',
    'auth_key': '${e.authKey}',
    'to': 'RECEIVER_NUMBER',
    'type': 'audio',
    'url': '<DIRECT_AUDIO_URL>',

    }
    files=[]
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    print(response.text)`,video:`import requests

    url = "${route("user.whatsapp-web.api.send-message")}"

    payload={
    'app_key': '${e.app.key}',
    'auth_key': '${e.authKey}',
    'to': 'RECEIVER_NUMBER',
    'type': 'video',
    'url': '<DIRECT_VIDEO_URL>',

    }
    files=[]
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    print(response.text)`,document:`import requests

    url = "${route("user.whatsapp-web.api.send-message")}"

    payload={
    'app_key': '${e.app.key}',
    'auth_key': '${e.authKey}',
    'to': 'RECEIVER_NUMBER',
    'type': 'document',
    'url': '<DIRECT_DOCUMENT_URL>',

    }
    files=[]
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    print(response.text)`}};function i(a){return a.replace(/\\n/g,`
`)}const U=[{value:"app_key",type:"string",required:"Yes",description:"Used to authorize a transaction for the app"},{value:"auth_key",type:"string",required:"Yes",description:"Used to authorize a transaction for the is valid user"},{value:"to",type:"string",required:"Yes",description:"Recipient Whatsapp number should be full number with country code"},{value:"type",type:"string",required:"Yes",description:"The type of message to be sent"},{value:"message",type:"string",required:"Required for text messages",description:"The message to be sent. The message can be in text only"},{value:"url",type:"string",required:"Required for image, audio, video, and document messages",description:"The direct url to the media file."}];return(a,E)=>(u(),o(_,null,[s("div",L,[s("div",$,[(u(),o(_,null,R(m,t=>s("button",{key:t.value,class:T(["btn w-full px-14 py-2 md:w-auto",{"btn-primary":p.value===t.value}]),onClick:c=>p.value=t.value},[s("span",I,r(t.title),1)],10,f)),64))]),s("div",k,[(u(),o(_,null,R(O,t=>s("button",{key:t.value,class:T(["btn w-full px-14 py-2 md:w-auto",{"btn-primary":n.value===t.value}]),onClick:c=>n.value=t.value},[s("span",g,r(t.title),1)],10,P)),64))])]),s("div",v,[p.value==="curl"?(u(),o("div",S,[s("div",b,[s("p",N,r(a.trans("Send Message")),1),s("pre",w,r(i(l.curl[n.value])),1)])])):d("",!0),p.value==="php"?(u(),o("div",D,[s("div",q,[s("p",M,r(a.trans("Send Message")),1),s("pre",V,r(i(l.php[n.value])),1)])])):d("",!0),p.value==="nodejs"?(u(),o("div",x,[s("div",A,[s("p",B,r(a.trans("Send Message")),1),s("pre",K,r(i(l.nodejs[n.value])),1)])])):d("",!0),p.value==="python"?(u(),o("div",F,[s("div",H,[s("p",G,r(a.trans("Send Message")),1),s("pre",j,r(i(l.python[n.value])),1)])])):d("",!0),s("div",Q,[s("p",W,r(a.trans("Successful Json Callback")),1),E[0]||(E[0]=s("pre",{class:"rounded bg-gray-100 p-2 dark:bg-dark-900"},`{
  "status": "Success",
  "data": {
    "from": "SENDER_NUMBER",
    "to": "RECEIVER_NUMBER",
    "status_code": 200
  }
}      `,-1))]),s("div",X,[s("table",Y,[s("thead",null,[s("tr",null,[s("th",null,r(a.trans("S/N")),1),s("th",null,r(a.trans("VALUE")),1),s("th",null,r(a.trans("TYPE")),1),s("th",null,r(a.trans("REQUIRED")),1),s("th",null,r(a.trans("DESCRIPTION")),1)])]),s("tbody",z,[(u(),o(_,null,R(U,(t,c)=>s("tr",{key:t.sn},[s("td",null,r(c+1),1),s("td",null,r(t.value),1),s("td",null,r(t.type),1),s("td",null,r(t.required),1),s("td",null,r(t.description),1)])),64))])])])])],64))}});export{pe as default};
