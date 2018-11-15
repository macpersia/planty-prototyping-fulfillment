import { AgentSessionHandler as SuperSessionHandler } from 'planty-assistant-fulfillment-functions/handlers/agent/agent-session-handler';
import { INTENT_NEW_WEB_APP } from '../new-web-app-intent-handler';
import { ActionResponse } from 'planty-prototyping-model/action-response';

const PAYLOAD_TYPE_KEY = "planty.payload.type";

export class AgentSessionHandler extends SuperSessionHandler {

    // constructor(protected readonly conv: DialogflowConversation,
    //             protected readonly messageId: string,
    //             protected readonly responseHandler: (res: Response) => any
    // ) {
    //     super(conv, messageId, responseHandler);
    // }

    // @Override
    public handleFrame(headers/*: StompHeaders*/, payload: any): void {

        console.log('>>>> handling frame...');
        console.log('>>>> headers: ', headers);
        console.log('>>>> payload: ', payload);
        const destination = headers['destination'];

        if (headers['correlation-id'] == this.messageId
            && destination.startsWith('/user/queue/action-responses')
            && destination.endsWith(this.emailAddress)) {

            const response = payload instanceof String ?
                payload as string
                : /*toPrettyJson(payload)*/payload;
            console.info("Here's the action response: " + response);
            const report: string = response == "Pong!" ?
                "Agent pong!"
                : "All right! I'm done!";
            // this.futureResponse.resolve(this.conv.ask(report));
            this.responseHandler(report);
        }

        if ( headers[PAYLOAD_TYPE_KEY] == 'be.planty.models.prototyping.ActionRequest'
             && this.conv.intent.match(INTENT_NEW_WEB_APP)) {
            try {
                console.log("Received action response: ", payload);
                const actionResponse = payload as ActionResponse<string>;
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
