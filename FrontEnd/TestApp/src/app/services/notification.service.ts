// import the packages 
import { Injectable, EventEmitter } from '@angular/core';
import { AuthService} from './auth.service';

// declare the global variables  
declare var $: any;

@Injectable()  
export class NotificationService {
    // Declare the variables
    private proxy: any;  
    private proxyName: string = 'notifications';  
    private connection: any;

    // create the Event Emitter
    public notificationReceived: EventEmitter < string >; 
    public disapprovedAccReceived: EventEmitter < boolean >;
    public connectionEstablished: EventEmitter < Boolean >;  
    public connectionExists: Boolean;

    //public authService: AuthService;

    constructor(private authService: AuthService) {  
        //this.authService = new AuthService();
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.notificationReceived = new EventEmitter < string > (); 
        this.disapprovedAccReceived = new EventEmitter < boolean > ();
        this.connectionExists = false;  
        // create hub connection  
        this.connection = $.hubConnection("http://localhost:54042/");  
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        // register on server events  
        this.registerOnServerEvents();
        this.adminRegisterOnServerEvents();

        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection();      
    }

    private registerOnServerEvents(): void {  
        
        this.proxy.on('approveNotification', (data: string) => {  
            console.log('received notification: ' + data);  
            this.notificationReceived.emit(data);  
        }); 
    }

    private adminRegisterOnServerEvents(): void {  
        
        this.proxy.on('disapprovedAccNotification', (data: boolean) => {  
            //console.log('received notification: ' + data);  
            this.disapprovedAccReceived.emit(data);  
        }); 
    }

    private startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  
            this.connectionEstablished.emit(true);  
            this.connectionExists = true;
            let role = this.authService.getRole();
            let userId = this.authService.getUserId();  
            this.proxy.invoke('AddToGroup', role, userId);
        }).fail((error: any) => {  
            console.log('Could not connect ' + error);  
            this.connectionEstablished.emit(false);  
        });  
    }
}