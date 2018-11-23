import { AgentSessionHandler as SuperSessionHandler } from 'planty-assistant-fulfillment-functions/handlers/agent/agent-session-handler';
import { INTENT_NEW_WEB_APP } from '../new-web-app-intent-handler';
import { ActionResponse } from 'planty-prototyping-model/action-response';
import { PAYLOAD_TYPE_KEY } from 'planty-assistant-model';
import { AgentClient } from './agent-client';

export class AgentSessionHandler extends SuperSessionHandler {

    // constructor(protected readonly conv: DialogflowConversation,
    //             protected readonly messageId: string,
    //             protected readonly responseHandler: (res: Response) => any
    // ) {
    //     super(conv, messageId, responseHandler);
    // }

    // @Override
    public handleFrame(headers/*: StompHeaders*/, payload: any): void {

        console.log('>>>> headers[PAYLOAD_TYPE_KEY]: ', headers[PAYLOAD_TYPE_KEY]);
        console.log('>>>> AgentClient.RES_PAYLOAD_TYPE: ', AgentClient.RES_PAYLOAD_TYPE);
        console.log('>>>> this.conv.intent: ',  this.conv.intent);
        if ( headers[PAYLOAD_TYPE_KEY] == AgentClient.RES_PAYLOAD_TYPE
             && this.conv.intent == INTENT_NEW_WEB_APP) {
            try {
                console.log("Received action response: ", payload);
                const actionResponse = JSON.parse(payload) as ActionResponse<string>;
                const statusCode = actionResponse.statusCode;
                if ( statusCode / 100 == 2) {
                    const appId = actionResponse.body;
                    this.responseHandler("<speak>"
                                            + "I'm done with the app creation, and the app i.d. is"
                                            + " <say-as interpret-as=\"telephone\">" + appId + "</say-as>."
                                            + "</speak>");
                } else{
                    this.responseHandler("The request failed with error code" +
                                            " <say-as interpret-as=\"telephone\">" + statusCode + "</say-as>.");
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            super.handleFrame(headers, payload);
        }
    }
}
