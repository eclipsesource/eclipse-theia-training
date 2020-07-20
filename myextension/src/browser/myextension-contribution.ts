import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";
import {HelloBackendService} from 'backendextension/lib/common/protocol';

export const MyextensionCommand = {
    id: 'Myextension.command',
    label: "Say Hello"
};

@injectable()
export class MyextensionCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(HelloBackendService) private readonly helloBackendService: HelloBackendService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MyextensionCommand, {
            execute: () => {
                this.helloBackendService.sayHelloTo('Jonas').then((r: string) => this.messageService.info(r));
            }
        });
    }
}

@injectable()
export class MyextensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: MyextensionCommand.id,
            label: MyextensionCommand.label
        });
    }
}
