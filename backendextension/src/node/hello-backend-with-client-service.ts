import { injectable } from "inversify";
import { BackendClient, HelloBackendWithClientService } from "../common/protocol";

@injectable()
export class HelloBackendWithClientServiceImpl implements HelloBackendWithClientService {
    private client?: BackendClient;
    greet(): Promise<string> {
        return new Promise<string>((resolve, reject) => 
        this.client?
        Promise.all([this.client?.getGreeting(), this.client?.getName()]).then(result => {
            resolve (`${result[0]} ${result[1]}`);
        }): reject('no client'));
    }
    dispose(): void {
        // do nothing
    }
    setClient(client: BackendClient): void {
        this.client = client;
    }

}
