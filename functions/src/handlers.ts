import { dialogflow, DialogflowConversation, BasicCard, Suggestions, Parameters, SignInArgument } from 'actions-on-google';
import { getEmailAddress } from './assistant-utils';

export const defaultWelcomeIntentHandler = (conv: DialogflowConversation) => {
  // conv.ask('Hi, how is it going?');
  // conv.ask(`Here's a picture of a cat`);
  // conv.ask(new Image({
  //   url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
  //   alt: 'A cat',
  // }));
  conv.ask(`Welcome! This is Planty Proto. You can ask Agent Proto to create a web app for you.`);
  // conv.ask("Welcome to Planty Proto Skill. You can ask Proto to create a web app for you.");
};

export const fallbackIntentHandler = (conv: DialogflowConversation) => {
  conv.ask(`I didn't understand`);
  conv.ask(`I'm sorry, can you try again?`);
  // conv.ask("Sorry, I don't know that. You can try saying help!");
};

export const testProgressiveResponseIntentHandler = (conv: DialogflowConversation) => {
  //console.log('agent parameter for getPhoneNoIntent: ', agent);
  conv.ask(`This message is from Dialogflow's Cloud Functions for Agent Proto!`);
  conv.ask(new BasicCard({
    title: `Title: this is a card title`,
    image: { 
      url: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
      accessibilityText: "Google Assistant's Badge"
    },
    text: `This is the body text of a card. You can even use line\n breaks and emoji! 💁`,
    buttons: {
      title: 'This is a button',
      openUrlAction: { url: 'https://assistant.google.com/' }
    }
  })
  );
  conv.ask(new Suggestions(`Quick Reply`));
  conv.ask(new Suggestions(`Suggestion`));
  conv.contexts.set('weather', 2, { city: 'Kuala Lumpur' });
};

export const emailAddressIntentHandler = (conv: DialogflowConversation, 
                                          params: Parameters, 
                                          signIn: SignInArgument) => {
  console.log('>>>> sign-in arg in emailAddressIntentHandler: ', signIn);
  const emailAddress = getEmailAddress(conv, signIn);
  const title = emailAddress? 
                'EmailAddress' 
                : 'Account Linking Needed!';
  const text = emailAddress? 
                'Your registered email address is ' + emailAddress
                : 'Please link this action, and try again.' ;
  conv.ask(text);
  conv.ask(new BasicCard({ title: title,  text: text }));
};
