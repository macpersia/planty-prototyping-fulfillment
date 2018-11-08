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

export const emailAddressIntentHandler = (conv: DialogflowConversation) => {
  const emailAddress = getEmailAddress(conv);
  const title = emailAddress? 
                'EmailAddress' 
                : 'Account Linking Needed!';
  const text = emailAddress? 
                'Your registered email address is ' + emailAddress
                : 'Please sign in, and try again.' ;
  conv.ask(text);
  conv.ask(new BasicCard({ title: title,  text: text }));
};

const SLOT_PHONE_NO = "phoneNo";
export const changePhoneNoIntentHandler  = (conv: DialogflowConversation) => {
  // logger.info(">>>> request.getDialogState(): " + request.getDialogState());
  const phoneNoSlot = conv.parameters[SLOT_PHONE_NO];
  console.log(">>>> phoneNoSlot: ", phoneNoSlot);
  // final SlotConfirmationStatus confirmationStatus = phoneNoSlot.getConfirmationStatus();
  // if (phoneNoSlot == '') {
  //     console.log(">>>> Delegating the dialog to Alexa, to get the phone number...");
  //     return input.getResponseBuilder().addDelegateDirective(null).build();
  //     return;
  // } if (confirmationStatus.equals(SlotConfirmationStatus.NONE)) {
  //     logger.info(">>>> Delegating the dialog to Alexa, to confirm the phone number...");
  //     return input.getResponseBuilder().addDelegateDirective(null).build();
  // } else if (confirmationStatus.equals(SlotConfirmationStatus.CONFIRMED)) {
  // } else {
    const attsManager = conv.user.storage;
    // const userId = conv.user.id;
    // //attsManager.getSessionAttributes().put(SLOT_PHONE_NO, phoneNoSlot.getValue());
    // attsManager.getPersistentAttributes().put(userId + "-" + SLOT_PHONE_NO, phoneNoSlot.getValue());
    // attsManager.savePersistentAttributes();
    attsManager[SLOT_PHONE_NO] = phoneNoSlot as string;

    const response =
            // (request.getDialogState() == IN_PROGRESS ? "Alright!" : "Sure!")
            "Alright!"
                    + " Consider it done!";
    conv.ask(response);
  // }
  // return;
};

export const getPhoneNoIntentHandler  = (conv: DialogflowConversation) => {
  const attsManager = conv.user.storage;
  // const userId = conv.user.id;
  // const phoneNoAtt = attsManager[userId + "-" + SLOT_PHONE_NO];
  const phoneNoAtt = attsManager[SLOT_PHONE_NO];
  console.log(">>>> phoneNoAtt: ", phoneNoAtt);
  const phoneNo = phoneNoAtt as string;
  conv.ask(
    !phoneNo || phoneNo == '' ? 
      "You haven't registered any phone number yet!"
      : "The phone number is "
          + phoneNo.substring(0, 2) + " "
          + phoneNo.substring(2, 4) + " "
          + phoneNo.substring(4, 6) + " "
          + phoneNo.substring(6, 8) + " "
          + phoneNo.substring(8));
};

export const newWebAppIntentHandler  = (conv: DialogflowConversation) => {
  throw Error('Not implemented yet!');
};