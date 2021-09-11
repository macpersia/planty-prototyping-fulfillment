import * as functions from "firebase-functions";

import { dialogflow/* , DialogflowConversation, Contexts*/, SignIn, SignInArgument } from 'actions-on-google';

import { defaultWelcomeIntentHandler } from './handlers';
import { fallbackIntentHandler } from 'planty-assistant-fulfillment-functions/handlers';
import { testProgressiveResponseIntentHandler } from 'planty-assistant-fulfillment-functions/handlers/test-progressive-response-intent-handler';
import { emailAddressIntentHandler } from 'planty-assistant-fulfillment-functions/handlers/email-address-intent-handler';
import { changePhoneNoIntentHandler } from './handlers/change-phone-no-intent-handler';
import { getPhoneNoIntentHandler } from './handlers/get-phone-no-intent-handler';
import { newWebAppIntentHandler } from './handlers/new-web-app-intent-handler';

// Create an app instance
const app = dialogflow({
  clientId: '1033807724027-paihgfarehcqdtlsm193apcp101qirrh.apps.googleusercontent.com',
  // debug: true
});


// Intent that starts the account linking flow.
app.intent('Start Sign-in', (conv) => {
  // conv.ask(new SignIn('To get your account details'))
  conv.ask(new SignIn('To get your email address'));
});
// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
// app.intent('Get Sign-in', (conv, ...args) => {
// console.log('>>>> args in "Get Sign-in"...');
// args.forEach((arg, i) => console.log(`>>>> args[${i}]: `,  arg));
// console.log('>>>> conv in "Get Sign-in...');
// console.log(conv);
app.intent('Get Sign-in', (conv: /* DialogflowConversation*/any, params, signIn: SignInArgument) => {
  console.log('>>>> sign-in arg in "Get Sign-in": ', signIn);
  if (signIn.status === 'OK') {
    const email = conv.user.profile.payload?.email;

    // let ctx = conv.contexts.get('my-session');
    // // if (!ctx) {
    // //   conv.contexts.set('my-session', 5);
    // //   ctx = conv.contexts.get('my-session');
    // // }
    // let params = ctx.parameters;
    // if (!params) params = ctx.parameters = {};
    // params.email = email;
    // conv.contexts.output['my-session'] = ctx;
    // // console.log('>>>> all contexts - after: ', conv.contexts);
    conv.data['email'] = email;

    const payload = conv.user.profile.payload;
    conv.ask(`I got your account details, ${payload?.name}. What do you want to do next?`);
  } else {
    conv.ask('I won\'t be able to save your data, but what do you want to do next?');
  }
});

app.intent('Default Welcome Intent', defaultWelcomeIntentHandler);
app.intent('Default Fallback Intent', fallbackIntentHandler);
app.intent('TestProgressiveResponseIntent', testProgressiveResponseIntentHandler);
app.intent('EmailAddressIntent', emailAddressIntentHandler);
app.intent('ChangePhoneNoIntent', changePhoneNoIntentHandler);
app.intent('GetPhoneNoIntent', getPhoneNoIntentHandler);
app.intent('NewWebAppIntent', newWebAppIntentHandler);

export const fulfillment = functions.https.onRequest(app);
