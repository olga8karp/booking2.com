export interface Alert {
    type: AlertType;
    message: SuccessAlertMessage | string;
}

export enum AlertType {
    success = 'success',
    danger = 'danger'
}

export enum SuccessAlertMessage {
    loginSuccess = 'You have been sucessfully authorized',
    signupSuccess = 'You have sucessfully created an account.',
    emailSent = 'Password reset email sent, check your inbox'
}