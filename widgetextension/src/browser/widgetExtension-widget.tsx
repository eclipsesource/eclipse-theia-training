import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService, Emitter } from '@theia/core';
import { Saveable } from '@theia/core/lib/browser';

@injectable()
export class WidgetExtensionWidget extends ReactWidget implements Saveable{
    dirty: boolean = false;


    public readonly myEmitter = new Emitter<void>();
    onDirtyChanged = this.myEmitter.event;


    autoSave : "off";
    save(): import("@theia/core").MaybePromise<void> {
        this.dirty= false;
        this.myEmitter.fire(undefined);
    }

    static readonly ID = 'widgetExtension:widget';
    static readonly LABEL = 'WidgetExtension Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise < void> {
        
        this.id = WidgetExtensionWidget.ID;
        this.title.label = WidgetExtensionWidget.LABEL;
        this.title.caption = WidgetExtensionWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    protected render(): React.ReactNode {
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
        return <div id='widget-container'>
            <AlertMessage type='INFO' header={header} />
            <button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
        </div>
    }

    protected displayMessage(): void {
        this.dirty= true;
        this.myEmitter.fire(undefined);
        this.messageService.info("Hello");
    }

}
