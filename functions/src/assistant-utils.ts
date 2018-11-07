import { DialogflowConversation, SignInArgument } from "actions-on-google";

export const getEmailAddress = (conv: DialogflowConversation, signin: SignInArgument): string | undefined => {
    // const sessionCtx = conv.contexts.get('session');
    // console.log('>>>> sessionCtx: ', sessionCtx);
    // const existingEmail = sessionCtx.parameters['email'];
    // console.log('>>>> email: ', existingEmail);
    // if (existingEmail) {
    //     return existingEmail as string;    
    // } else {
        let email = undefined;
        if (signin.status === 'OK') {
            email = conv.user.profile.payload.email;
        }
        // if (email) {
        //     sessionCtx.parameters['email'] = email;
        // }
        return email;
    // }
};