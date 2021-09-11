// import { DialogflowConversation } from "actions-on-google";
import { SLOT_PHONE_NO } from './change-phone-no-intent-handler';

export const getPhoneNoIntentHandler = (conv: /* DialogflowConversation*/any) => {
  const attsManager = conv.user.storage;
  // const userId = conv.user.id;
  // const phoneNoAtt = attsManager[userId + "-" + SLOT_PHONE_NO];
  const phoneNoAtt = attsManager[SLOT_PHONE_NO];
  console.log('>>>> phoneNoAtt: ', phoneNoAtt);
  const phoneNo = phoneNoAtt as string;
  conv.ask(
        !phoneNo || phoneNo == '' ?
            'You haven\'t registered any phone number yet!'
            : 'The phone number is '
            + phoneNo.substring(0, 2) + ' '
            + phoneNo.substring(2, 4) + ' '
            + phoneNo.substring(4, 6) + ' '
            + phoneNo.substring(6, 8) + ' '
            + phoneNo.substring(8));
};
