import { DialogflowConversation } from "actions-on-google";
import { SLOT_PHONE_NO } from "./change-phone-no-intent-handler";

const SLOT_APP_NAME = "appName";

export const newWebAppIntentHandler = (conv: DialogflowConversation) => {
    const appNameSlot = conv.parameters[SLOT_APP_NAME];
    console.log(">>>> appNameSlot: ", appNameSlot);

    const actionReq = createRequest(conv);
    // CompletableFuture<Optional<Response>>
    // const futureResponse = agentClient.messageAgent(input, actionReq);
    // Optional<Response>
    // const response = futureResponse.get(45, TimeUnit.SECONDS);
    // console.log(">>>> Final response is ready.");
    // conv.ask(response);
};

const INTENT_NEW_WEB_APP = "NewWebAppIntent";

const createRequest: /*ActionRequest*/any = (conv: DialogflowConversation) => {
    const appName = conv.parameters[SLOT_APP_NAME] as string;
    const phoneNo = conv.user.storage[SLOT_PHONE_NO] as string;

    //return "Create an app named '" + appName + "'";
    const params = {};
    params[SLOT_APP_NAME] = appName;
    params[SLOT_PHONE_NO] = phoneNo ? phoneNo : null;
    // return new ActionRequest(INTENT_NEW_WEB_APP, params);
    return ({
        action: INTENT_NEW_WEB_APP,
        parameters: params
    });
};
