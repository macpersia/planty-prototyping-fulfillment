import { DialogflowConversation } from "actions-on-google";

export const getEmailAddress = (conv: DialogflowConversation): string | undefined => {
    const profileCtx = conv.contexts.get('profile');
    console.log('>>>> profileCtx: ', profileCtx);
    const email = profileCtx.parameters['email'];
    console.log('>>>> email: ', email);
    if (email) {
        return email as string;    
    } else {
        // TODO: Implement email address retrieval
        return undefined;
    }
};