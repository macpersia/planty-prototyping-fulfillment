import { AgentClient } from './agent-client';
import { mocked } from 'ts-jest/utils';
import { DialogflowConversation } from 'actions-on-google';

jest.setTimeout(10000);

describe('AgentClient', () => {
    let instance: AgentClient;

    beforeEach(() => {
        instance = new AgentClient();
    });

    it('should get a response for requesting an action', async () => {
        expect(instance).toBeInstanceOf(AgentClient);
        const mockConv = mocked(new DialogflowConversation()) as DialogflowConversation;
        mockConv.data['email'] = 'agent.prototyper@localhost';        
        const message/*: ActionRequest*/ = /*new ActionRequest*/({
            action: 'NewWebApp', 
            parameters: {
                WebAppName: 'Tequila'
            }
        });
        const response = await instance.messageAgent(mockConv, message);
        expect(response).toBeDefined();
        expect(response).toBe("All right! I'm done!");
    });
});