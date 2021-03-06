//================================================================ 
/** @module tgrid.protocols */
//================================================================
import { IState } from "./IState";
import { DomainError, RuntimeError } from "tstl/exception";

export interface IAcceptor<State extends Acceptor.State, Provider extends object>
    extends IState<State>
{
    /**
     * Accept connection.
     *
     * Accept, permit the client's, connection with this server and start interaction.
     * 
     * @param provider An object providing features to remote system.
     */
    accept(provider: Provider | null): Promise<void>;
}

/**
 * @hidden
 */
export namespace Acceptor
{
    export enum State
    {
        NONE = -1,
        ACCEPTING,
        OPEN,
        REJECTING,
        CLOSING,
        CLOSED
    }

    export function inspect(state: State): Error | null
    {
        // NO ERROR
        if (state === State.OPEN)
            return null;

        // ERROR, ONE OF THEM
        else if (state === State.NONE)
            return new DomainError("Not accepted yet.");
        else if (state === State.ACCEPTING)
            return new DomainError("On accepting; wait for a sec.");
        else if (state === State.REJECTING || State.CLOSING)
            return new RuntimeError("The connection is on closing.");
        else if (state === State.CLOSED)
            return new RuntimeError("The connection has been closed.");

        // UNKNOWN ERROR, IT MAY NOT OCCURED
        else
            return new RuntimeError("Unknown error, but not connected.");
    }
}