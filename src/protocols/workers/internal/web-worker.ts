//================================================================ 
/** @module tgrid.protocols.workers */
//================================================================
import { URLVariables } from "../../../utils/URLVariables";

/**
 * @hidden
 */
export function compile(content: string): string
{
    let blob: Blob = new Blob([content], { type: "application/javascript" });
    return URL.createObjectURL(blob);
}

/**
 * @hidden
 */
export function remove(url: string): void
{
    // THE FILE CAN BE REMOVED BY BROWSER AUTOMATICALLY
    try
    {
        URL.revokeObjectURL(url);
    }
    catch {}
}

/**
 * @hidden
 */
export function execute(jsFile: string, ...args: string[]): Worker
{
    if (args.length)
    {
        let vars: URLVariables = new URLVariables();
        vars.set("__m_pArgs", JSON.stringify(args));

        jsFile += "?" + vars.toString();
    }
    return new Worker(jsFile);
}