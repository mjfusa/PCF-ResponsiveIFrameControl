import { IInputs, IOutputs } from "./generated/ManifestTypes";

import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class responsiveIframePCFControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // Reference to IFrame HTMLElement
    private _iframe: HTMLIFrameElement;
    private _iErrorframe: HTMLIFrameElement;

    private _height: number;
    private _width: number;
    private _iframe: HTMLIFrameElement;
    private _iErrorframe: HTMLIFrameElement;

    private _height: number;
    private _width: number;

    // SRC for iframe
    private _Source: string;
    // SRC for iframe
    private _Source: string;

    // Reference to the control container HTMLDivElement
    private _container: HTMLDivElement;
    // Reference to the control container HTMLDivElement
    private _container: HTMLDivElement;

    // Flag if control view has been rendered
    private _controlViewRendered: boolean;
    private _bErrorRendered = false;
    // Flag if control view has been rendered
    private _controlViewRendered: boolean;
    private _bErrorRendered = false;

    /**
     * Empty constructor.
     */
    constructor() {
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Add control initialization code
        this._container = container;
        this._controlViewRendered = false;
        context.mode.trackContainerResize(true);
        this._controlViewRendered = false;
        context.mode.trackContainerResize(true);
    }



    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const iframeSrc = context.parameters.source.raw;
        const htmlstr = context.parameters.html.raw as string;
        const DisplayError = context.parameters.displayerror.raw;


        // Add code to update control view
        if (!this._controlViewRendered) {
            this.renderIFrame();
            this.renderErrorIFrame();
            this._controlViewRendered = true;
        }

        this._height = context.mode.allocatedHeight;
        this._width = context.mode.allocatedWidth;

        this._Source = iframeSrc ? iframeSrc : "";

        if (DisplayError?.toLowerCase() == 'false') {
            // Hide iErrorFrame Frame. Show Content iFrame.
            this._iframe.setAttribute("style", `width:${this._width};height:${this._height};border:0;`);
            this._iErrorframe.setAttribute("style", `display: none;`);
            this._iframe.setAttribute("src", this._Source);
        } else {
            // Show iErrorFrame Frame. Hide Content iFrame.
            this._iErrorframe.setAttribute("style", `width:${this._width};height:${this._height};border:0;`);
            this._iframe.setAttribute("style", `display: none;`);
            if (!this._bErrorRendered) {
                this._iErrorframe.contentWindow?.document.write(htmlstr);
                this._bErrorRendered = true;
            }
        }
    }

    /** 
     * Render iframe HTML Element and appends it to the control container 
     */
    private renderIFrame(): void {
        const iFrameElement: HTMLIFrameElement = document.createElement("iframe");
        iFrameElement.setAttribute("class", "iFrameControl");
        iFrameElement.setAttribute("frameborder", "0");
        const iFrameElement: HTMLIFrameElement = document.createElement("iframe");
        iFrameElement.setAttribute("class", "iFrameControl");
        iFrameElement.setAttribute("frameborder", "0");

        this._iframe = iFrameElement;
        this._iframe = iFrameElement;

        this._container.appendChild(this._iframe);
    }

    private renderErrorIFrame(): void {
        const iFrameElement: HTMLIFrameElement = document.createElement("iframe");
        iFrameElement.setAttribute("class", "iFrameControl");
        iFrameElement.setAttribute("frameborder", "0");
        iFrameElement.setAttribute("style", `display: none;`);

        this._iErrorframe = iFrameElement;
        this._container.appendChild(this._iErrorframe);
    }
        this._container.appendChild(this._iframe);
    }

    private renderErrorIFrame(): void {
        const iFrameElement: HTMLIFrameElement = document.createElement("iframe");
        iFrameElement.setAttribute("class", "iFrameControl");
        iFrameElement.setAttribute("frameborder", "0");
        iFrameElement.setAttribute("style", `display: none;`);

        this._iErrorframe = iFrameElement;
        this._container.appendChild(this._iErrorframe);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}