// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// // for Dialogflow fulfillment library docs, samples, and to report issues
// 'use strict';
 
// const functions = require('firebase-functions');
import * as functions from 'firebase-functions';

// // const {WebhookClient} = require('dialogflow-fulfillment');
// // const {Card, Suggestion} = require('dialogflow-fulfillment');
// import {WebhookClient, Card, Suggestion} from 'dialogflow-fulfillment';

// process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

import {dialogflow, Image, BasicCard, Suggestions, SignIn, SignInArgument} from 'actions-on-google';

import {
  defaultWelcomeIntentHandler, 
  testProgressiveResponseIntentHandler, 
  fallbackIntentHandler,
  emailAddressIntentHandler
} from './handlers';

// Create an app instance
const app = dialogflow({
});

// Intent that starts the account linking flow.
app.intent('Start Sign-in', conv => {
  // conv.ask(new SignIn('To get your account details'))
  conv.ask(new SignIn('To get your email address'))
});

// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
// app.intent('Get Sign-in', (conv, ...args) => {
  // console.log('>>>> args in "Get Sign-in"...');
  // args.forEach((arg, i) => console.log(`>>>> args[${i}]: `,  arg));
  // console.log('>>>> conv in "Get Sign-in...');
  // console.log(conv);
app.intent('Get Sign-in', (conv, params, signin: SignInArgument) => {
  console.log('>>>> sign-in arg in "Get Sign-in": ', signin);
  Object.keys(arguments).forEach(key => console.log(`>>>> arguments[${key}]: `,  arguments[key]));
  if (signin.status === 'OK') {
    const payload = conv.user.profile.payload
    conv.ask(`I got your account details, ${payload.name}. What do you want to do next?`)
  } else {
      conv.ask(`I won't be able to save your data, but what do you want to do next?`)
  }
});

app.intent('Default Welcome Intent', defaultWelcomeIntentHandler);
app.intent('Default Fallback Intent', fallbackIntentHandler);
app.intent('TestProgressiveResponseIntent', testProgressiveResponseIntentHandler);  
app.intent('EmailAddressIntent', emailAddressIntentHandler);

export const fulfillment = functions.https.onRequest(app);


// export const oldFulfillment = functions.https.onRequest((request, response) => {
//   console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
//   console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
//   const app = new WebhookClient({ request, response });
 
//   const welcome = (agent: WebhookClient) => {
//     agent.add(`Welcome! This is Proto. How may I help you?`);
//   };
 
//   const fallback = (agent: WebhookClient) => {
//     agent.add(`I didn't understand`);
//     agent.add(`I'm sorry, can you try again?`);
//   };

//   // // Uncomment and edit to make your own intent handler
//   // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
//   // // below to get this function to be run when a Dialogflow intent is matched
//   // function yourFunctionHandler(agent) {
//   //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
//   //   agent.add(new Card({
//   //       title: `Title: this is a card title`,
//   //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
//   //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
//   //       buttonText: 'This is a button',
//   //       buttonUrl: 'https://assistant.google.com/'
//   //     })
//   //   );
//   //   agent.add(new Suggestion(`Quick Reply`));
//   //   agent.add(new Suggestion(`Suggestion`));
//   //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
//   // }

//   // // Uncomment and edit to make your own Google Assistant intent handler
//   // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
//   // // below to get this function to be run when a Dialogflow intent is matched
//   // function googleAssistantHandler(agent) {
//   //   let conv = agent.conv(); // Get Actions on Google library conv instance
//   //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
//   //   agent.add(conv); // Add Actions on Google library responses to your agent's response
//   // }
//   // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
//   // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

//   // Run the proper function handler based on the matched Dialogflow intent name
//   const intentMap = new Map();
//   intentMap.set('Default Welcome Intent', welcome);
//   intentMap.set('Default Fallback Intent', fallback);
//   // intentMap.set('your intent name here', yourFunctionHandler);
//   // intentMap.set('your intent name here', googleAssistantHandler);



//   const testProgressiveResponse = (agent: WebhookClient) => {
//     //console.log('agent parameter for getPhoneNoIntent: ', agent);
//     agent.add(`This message is from Dialogflow's Cloud Functions for Agent Proto!`);
//     agent.add(new Card({
//         title: `Title: this is a card title`,
//         imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
//         text: `This is the body text of a card. You can even use line\n breaks and emoji! 💁`,
//         buttonText: 'This is a button',
//         buttonUrl: 'https://assistant.google.com/'
//       })
//     );
//     agent.add(new Suggestion(`Quick Reply`));
//     agent.add(new Suggestion(`Suggestion`));
//     agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Kuala Lumpur' }});
//   };  
//   intentMap.set('TestProgressiveResponseIntent', testProgressiveResponse);



//   agent.handleRequest(intentMap);
// });
