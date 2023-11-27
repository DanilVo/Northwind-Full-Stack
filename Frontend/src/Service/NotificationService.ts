import { Notyf } from "notyf";

class NotificationService {
    private notification = new Notyf({
        duration: 4000,
        position: { x: 'center', y: 'top' }
    });

    public success(message: string): void {
        this.notification.success(message);
    }
    public error(err: string): void {
        const message = this.extractErrorMessage(err);
        this.notification.error(message);
    }

    private extractErrorMessage(err: any): string {

        if (typeof err === "string") return err;

        if (typeof err.response?.data === "string") return err.response?.data; // axios

        if (Array.isArray(err.response?.data)) return err.response?.data[0]; // axios

        if (typeof err.message === "string") return err.message;
    }

}

const notificationService = new NotificationService();

export default notificationService;