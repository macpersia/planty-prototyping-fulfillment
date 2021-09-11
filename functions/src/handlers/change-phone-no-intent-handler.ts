// import { DialogflowConversation } from "actions-on-google";

export const SLOT_PHONE_NO = 'phoneNo';

export const changePhoneNoIntentHandler = (conv: /* DialogflowConversation*/any) => {
  // logger.info(">>>> request.getDialogState(): " + request.getDialogState());
  const phoneNoSlot = conv.parameters[SLOT_PHONE_NO];
  console.log('>>>> phoneNoSlot: ', phoneNoSlot);
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
        'Alright!'
        + ' Consider it done!';
  conv.ask(response);
  // }
  // return;
};
