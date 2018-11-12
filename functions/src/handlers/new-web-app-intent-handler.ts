import { DialogflowConversation } from 'actions-on-google';
import { SLOT_PHONE_NO } from "./change-phone-no-intent-handler";
import { AgentClient } from "./agent/agent-client";

const INTENT_NEW_WEB_APP = "NewWebAppIntent";
const SLOT_APP_NAME = "appName";

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

export const newWebAppIntentHandler = (conv: DialogflowConversation) => {
    const appNameSlot = conv.parameters[SLOT_APP_NAME];
    console.log(">>>> appNameSlot: ", appNameSlot);

    const actionReq = createRequest(conv);
    const agentClient = new AgentClient();
    const futureResponse = agentClient.messageAgent(conv, actionReq);
    futureResponse.then(res => {
        console.log(">>>> Final response is ready.");
        conv.ask(res);
    }).catch(err => {
        console.error(err);
    });
};

