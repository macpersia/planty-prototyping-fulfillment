// import { dialogflow, DialogflowConversation } from 'actions-on-google';

export const defaultWelcomeIntentHandler = (conv: /* DialogflowConversation*/any) => {
  // conv.ask('Hi, how is it going?');
  // conv.ask(`Here's a picture of a cat`);
  // conv.ask(new Image({
  //   url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
  //   alt: 'A cat',
  // }));
  conv.ask('Welcome! This is Planty Proto. You can ask Agent Proto to create a web app for you.');
  // conv.ask("Welcome to Planty Proto Skill. You can ask Proto to create a web app for you.");
};
