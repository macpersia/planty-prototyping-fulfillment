import { DialogflowConversation, Response } from "actions-on-google";
import { AgentClient as SuperAgentClient } from 'planty-assistant-fulfillment-functions/handlers/agent/agent-client';
import { AgentSessionHandler } from "./agent-session-handler";

export class AgentClient extends SuperAgentClient {

    async messageAgent(conv: DialogflowConversation, payload: any): Promise<Response> {
        return super.messageAgent(conv, payload);
    }

    // protected createSessionHandler: AgentSessionHandler (
    //     conv: DialogflowConversation, responseHandler: (res: Response) => any,
    //     messageId: string
    // ) {
    //     return new AgentSessionHandler(conv, messageId, responseHandler);
    // }
}
